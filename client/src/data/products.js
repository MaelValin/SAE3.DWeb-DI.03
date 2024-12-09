import {getRequest} from '../lib/api-request.js';

let Products = {};

Products.fetch= async function(id){
    let data = await getRequest('products/'+id);
    return data;

}

Products.fetchAll = async function(){
    let data = await getRequest('products');
    return data;
}

//une fonction qui permet de repondre cette requete: SELECT order_status, COUNT(*) AS total_Products FROM Products GROUP BY order_status;


export {Products};
