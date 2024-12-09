import { HeaderView } from "./ui/header/index.js";
import { Tarte } from "./ui/graphic/tarte.js";
import { Barre } from "./ui/graphic/barre.js";
import { Courbe } from "./ui/graphic/courbe.js";
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
    V.renderCourbe();
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

    salesData.sort((a, b) => b.total_sales - a.total_sales);

    let topSalesData = salesData.slice(0, 3);
    

   /* let newData = topSalesData.map(item => {
        return { value: item.total_sales, name: item.product_name };
    });

    Barre.updateData(newData);*/

let xAxisData = topSalesData.map(item => item.product_name);
let seriesData = topSalesData.map(item => item.total_sales);

Barre.updateData(seriesData, xAxisData);
   
}

V.renderCourbe = async function() {
    Courbe.init();


    let orders = await Orders.fetchAll();
    let orderItems = await Orderitems.fetchAll();
    let products = await Products.fetchAll();

    let sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 4);

    let filteredOrders = orders.filter(o => new Date(o.order_date) >= sixMonthsAgo);

    let monthlySales = filteredOrders.reduce((acc, order) => {
        let month = order.order_date.slice(0, 7); // Format YYYY-MM
        let orderItemsForOrder = orderItems.filter(oi => oi.order_id === order.id);
        let monthlyTotal = orderItemsForOrder.reduce((sum, oi) => {
            let product = products.find(p => p.id === oi.product_id);
            return sum + (oi.quantity * product.price);
        }, 0);

        let existing = acc.find(item => item.month === month);
        if (existing) {
            existing.monthly_sales += monthlyTotal;
        } else {
            acc.push({ month: month, monthly_sales: monthlyTotal });
        }
        return acc;
    }, []);

    monthlySales.sort((a, b) => new Date(a.month) - new Date(b.month));

    let xAxisData = monthlySales.map(item => item.month);
    let seriesData = monthlySales.map(item => item.monthly_sales);

console.log(xAxisData);
console.log(seriesData);

Courbe.updateData(seriesData, xAxisData);

}

C.init();
