import {getRequest} from '../lib/api-request.js';

let Orderitems = {};

Orderitems.fetch= async function(id){
    let data = await getRequest('orderitems/'+id);
    return data;

}

Orderitems.fetchAll = async function(){
    let data = await getRequest('orderitems');
    return data;
}


Orderitems.fetchiteration4 = async function(){
    let data = await getRequest('orderitems?stat=iteration4');
    return data;
}
//une fonction qui permet de repondre cette requete: SELECT order_status, COUNT(*) AS total_orderitems FROM Orderitems GROUP BY order_status;


export {Orderitems};
