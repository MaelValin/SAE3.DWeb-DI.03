const templateFile = await fetch("./src/ui/graphicclient/template.html");
const template = await templateFile.text();

let GraphClientView = {};

GraphClientView.render = function(){
    return template;
}




export { GraphClientView };
