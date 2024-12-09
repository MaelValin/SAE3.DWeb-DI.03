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

V.renderMain = function() {
    // Initialiser le graphique
    let ord= Orders.fetchAll(); 
    console.log(ord);
    Tarte.init();

    // Mettre à jour les données du graphique
    const newData = [
        { value: 55, name: 'Haricot' },
        { value: 2, name: 'Brocoli' },
        { value: 25, name: 'Courgette' },
        { value: 105, name: 'Tomate' },
    ];
    Tarte.updateData(newData);
};

C.init();
