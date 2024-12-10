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

Orders.fetchAll = async function(){
    let data = await getRequest('orders');
    return data;
}

//une fonction qui permet de repondre cette requete: SELECT order_status, COUNT(*) AS total_orders FROM Orders GROUP BY order_status;


export {Orders};
