import { genericRenderer } from "../../lib/utils.js"; 


const templateFile = await fetch("./src/ui/choixclient/template.html.inc");
const template = await templateFile.text();

let ChoixclientView = {
  render: function(data) {
    let html = "";
    // Add the "all" option first
    let allOption = { id: "all", name: "all" };
    let rend = genericRenderer(template, allOption);
    rend = rend.replaceAll("{{id_client}}", allOption.id);
    rend = rend.replace("{{name}}", allOption.name);
    html += rend;

    // Render the rest of the data
    for (let obj of data) {
      let rend = genericRenderer(template, obj);
      rend = rend.replaceAll("{{id_client}}", obj.id);
      rend = rend.replace("{{name}}", obj.first_name+" "+obj.last_name);
      html += rend;
    }
    return html;
  }
};



export { ChoixclientView };
