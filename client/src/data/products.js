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

Products.fetchIteration8= async function(){
    let data = await getRequest('products?stat=iteration8');
    return data;

}

Products.fetchIteration8date= async function(){
    let data = await getRequest('products?stat=iteration8-date');
    return data;

}


export {Products};
