import { HeaderView } from "./ui/header/index.js";
import { Tarte } from "./ui/graphic/tarte.js";
import { Barre } from "./ui/graphic/barre.js";
import { Courbe } from "./ui/graphic/courbe.js";
import { BarreCourbe } from "./ui/graphic/barrecourbe.js";
import { Demicercle } from "./ui/graphic/demicercle.js";
import { ChoixView } from "./ui/choix/script.js";
import { Couche } from "./ui/graphic/couche.js";
import { GraphProdView } from "./ui/graphicprod/script.js";

import { Orderitems } from "./data/orderitems.js";
import { Products } from "./data/products.js";
import { Orders } from "./data/order.js";

let C = {};

C.init = async function () {
  V.init();
};

let V = {
  header: document.querySelector("#header"),
  main: document.querySelector("#main"),
  graphic: document.querySelector("#graphic-barre"),
  courbe: document.querySelector("#graphic-courbe"),
  barrecourbe: document.querySelector("#graphic-barrecourbe"),
  demicercle: document.querySelector("#graphic-demicercle"),
  choix: document.querySelector("#choix"),
  graphicprod: document.querySelector("#graphic-produits"),
};

V.init = function () {
  V.renderHeader();
  V.renderMain();
  V.renderGraphic();
  V.renderCourbe();
  V.renderBarreCourbe();
  V.renderDemicercle();
  

  if (document.querySelector("#graphic-produits")) {
    V.rendergraphprod();
    if (document.querySelector("#choix")) {
      V.renderChoix();
      V.renderproduct('all');
      let product = document.querySelector("#choix");
      product.addEventListener("click", C.handler_clickOnproduct);
    }
  }
  

  


  
};

V.renderHeader = function () {
  V.header.innerHTML = HeaderView.render();
};

V.rendergraphprod = function () {
  V.graphicprod.innerHTML = GraphProdView.render();
}

V.renderMain = async function () {
  // Initialiser le graphique
  let ord = await Orders.fetchIteration3();

  Tarte.init();

  // Mettre à jour les données du graphique grace a ord
  let newData = ord.map((order) => {
    return { value: order.montant, name: order.order_status };
  });

  /* const newData = [
        { value: 55, name: 'Haricot' },
        { value: 2, name: 'Brocoli' },
        { value: 25, name: 'Courgette' },
        { value: 105, name: 'Tomate' },
    ];*/
  Tarte.updateData(newData);
};

V.renderGraphic = async function () {
  Barre.init();

  let orderItems = await Orderitems.fetchiteration4();

  let xAxisData = orderItems.map((item) => item.product_name);
  let seriesData = orderItems.map((item) => item.total_sales);

  Barre.updateData(seriesData, xAxisData);
};

V.renderCourbe = async function () {
  Courbe.init();

  let orders = await Orders.fetchIteration5();

  let xAxisData = orders.map((item) => item.month);
  let seriesData = orders.map((item) => item.monthly_sales);

  Courbe.updateData(seriesData, xAxisData);
};

V.renderBarreCourbe = async function () {
  BarreCourbe.init();

  let order6 = await Orders.fetchIteration6();
  let order6date = await Orders.fetchIteration6Date();

  let categorySalesMap = {};

  order6.forEach((item) => {
    if (!categorySalesMap[item.product_category]) {
      categorySalesMap[item.product_category] = [];
    }
    categorySalesMap[item.product_category].push(item.total_sales);
  });

  let series = Object.values(categorySalesMap);
  let newlegendData = Object.keys(categorySalesMap);

  let xAxisData = order6date.map((item) => item.month);

  BarreCourbe.updateData(series, xAxisData, newlegendData);
};

V.renderDemicercle = async function () {
  let stock = await Products.fetchIteration7();
  Demicercle.init();

  let newstock = stock.map((stock) => {
    return { value: stock.stock, name: stock.product_name };
  });

  Demicercle.updateData(newstock);
};

V.renderChoix = async function () {
  let products = await Products.fetchIteration8();
  let prod = ChoixView.render(products);

  document.querySelector("#choix").innerHTML = prod;
};



V.renderproduct = async function (value) {
  Couche.init();

  if (value === "all") {
    let order = await Orders.fetchIteration8none();
    let productdate = await Products.fetchIteration8date();

    let all = true;

    let xAxisData = productdate.map((item) => item.month);
    Couche.updateData(order, xAxisData, all);
  } else {
    let order = await Orders.fetchIteration8(value);
    let productdate = await Products.fetchIteration8date();

    let SeriesData = order.map((item) => item.total_quantity_sold);

    let xAxisData = productdate.map((item) => item.month);
    let all = false;

    Couche.updateData(SeriesData, xAxisData, all);
  }
};

C.handler_clickOnproduct = async function (event) {
  Couche.init();

  try {
    let value = event.target.options[event.target.selectedIndex].value;

    V.renderproduct(value);
  } catch (e) {
    console.error("No value attribute");
  }
};



C.init();
