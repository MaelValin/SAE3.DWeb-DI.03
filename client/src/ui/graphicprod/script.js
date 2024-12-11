const templateFile = await fetch("./src/ui/graphicprod/template.html.inc");
const template = await templateFile.text();

let GraphProdView = {};

GraphProdView.render = function(){
    return template;
}




export { GraphProdView };
