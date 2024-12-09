import { HeaderView } from "./ui/header/index.js";
import { Tarte } from "./ui/tarte/tarte.js";
import { Orders } from "./data/order.js";

let C = {};

C.init = async function() {
    V.init();
};

let V = {
    header: document.querySelector("#header"),
    main: document.querySelector("#main"),
};

V.init = function() {
    V.renderHeader();
    V.renderMain();
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

C.init();
