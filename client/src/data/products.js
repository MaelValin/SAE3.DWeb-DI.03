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


Products.fetchIteration7= async function(){
    let data = await getRequest('products?stat=iteration7');
    return data;

}



export {Products};
