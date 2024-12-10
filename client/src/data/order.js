import {getRequest} from '../lib/api-request.js';

let Orders = {};

Orders.fetch= async function(id){
    let data = await getRequest('orders/'+id);
    return data;

}

Orders.fetchIteration3= async function(){
    let data = await getRequest('orders?stat=iteration3');
    return data;

}

Orders.fetchIteration5= async function(){
    let data = await getRequest('orders?stat=iteration5');
    return data;

}

Orders.fetchIteration6Date= async function(){
    let data = await getRequest('orders?stat=iteration6-date');
    return data;

}

Orders.fetchIteration6= async function(){
    let data = await getRequest('orders?stat=iteration6');
    return data;

}

Orders.fetchIteration8= async function(id){
    let data = await getRequest('orders?stat=iteration8&id='+id);
    return data;

}

Orders.fetchIteration8none= async function(id){
    let data = await getRequest('orders?stat=iteration8none');
    return data;

}

Orders.fetchAll = async function(){
    let data = await getRequest('orders');
    return data;
}

//une fonction qui permet de repondre cette requete: SELECT order_status, COUNT(*) AS total_orders FROM Orders GROUP BY order_status;


export {Orders};
