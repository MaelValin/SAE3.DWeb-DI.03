const templateFile = await fetch("./src/ui/graphicmap/template.html");
const template = await templateFile.text();

let GraphMapView = {};

GraphMapView.render = function(){
    return template;
}




export { GraphMapView };
