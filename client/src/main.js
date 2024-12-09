import { HeaderView } from "./ui/header/index.js";
import { Tarte } from "./ui/graphic/tarte.js";
import { Barre } from "./ui/graphic/barre.js";
import { Orderitems } from "./data/orderitems.js";
import { Products } from "./data/products.js";
import { Orders } from "./data/order.js";

let C = {};

C.init = async function() {
    V.init();
};

let V = {
    header: document.querySelector("#header"),
    main: document.querySelector("#main"),
    graphic: document.querySelector("#graphic-barre"),
};

V.init = function() {
    V.renderHeader();
    V.renderMain();
    V.renderGraphic();
};

V.renderHeader = function() {
    V.header.innerHTML = HeaderView.render();
};

V.renderMain = async function() {
    // Initialiser le graphique
    let ord= await Orders.fetchAll(); 
    let filteredOrders = ord.reduce((acc, order) => {
        let existing = acc.find(item => item.order_status === order.order_status);
        if (existing) {
            existing.total_orders += 1;
        } else {
            acc.push({ order_status: order.order_status, total_orders: 1 });
        }
        return acc;
    }, []);
    // filtrer en utilisant le sql: SELECT order_status, COUNT(*) AS total_orders FROM Orders GROUP BY order_status;

    Tarte.init();

    // Mettre à jour les données du graphique grace a filteredOrders
    let newData = filteredOrders.map(order => {
        return { value: order.total_orders, name: order.order_status };
    });
   /* const newData = [
        { value: 55, name: 'Haricot' },
        { value: 2, name: 'Brocoli' },
        { value: 25, name: 'Courgette' },
        { value: 105, name: 'Tomate' },
    ];*/
    Tarte.updateData(newData);
};



V.renderGraphic = async function() {

    Barre.init();

    let orderItems = await Orderitems.fetchAll();
    let orders = await Orders.fetchAll();
    let products = await Products.fetchAll();

    let twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    let filteredOrderItems = orderItems.filter(oi => {
        let order = orders.find(o => o.id === oi.order_id);
        return new Date(order.order_date) >= twoMonthsAgo;
    });

    let salesData = filteredOrderItems.reduce((acc, oi) => {
        let product = products.find(p => p.id === oi.product_id);
        let existing = acc.find(item => item.product_name === product.product_name);
        if (existing) {
            existing.total_sales += oi.quantity;
        } else {
            acc.push({ product_name: product.product_name, total_sales: oi.quantity });
        }
        return acc;
    }, []);
console.log(salesData);
    salesData.sort((a, b) => b.total_sales - a.total_sales);

    let topSalesData = salesData.slice(0, 3);
    console.log(topSalesData);

   /* let newData = topSalesData.map(item => {
        return { value: item.total_sales, name: item.product_name };
    });

    Barre.updateData(newData);*/

let xAxisData = topSalesData.map(item => item.product_name);
let seriesData = topSalesData.map(item => item.total_sales);
console.log(xAxisData);
console.log(seriesData);

Barre.updateData(seriesData, xAxisData);

    

    

   
}

C.init();
