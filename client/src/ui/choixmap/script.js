import { genericRenderer } from "../../lib/utils.js"; 


const templateFile = await fetch("./src/ui/choixmap/template.html.inc");
const template = await templateFile.text();

let ChoixmapView = {
  render: function(data) {
    let html = "";
    // Add the "all" option first
    let allOption = { month_year: "all" };
    let rend = genericRenderer(template, allOption);
    rend = rend.replaceAll("{{month}}", allOption.month_year);
    
    html += rend;

    // Render the rest of the data
    for (let obj of data) {
      let rend = genericRenderer(template, obj);
      rend = rend.replaceAll("{{month}}", obj.month_year);
      html += rend;
    }
    return html;
  }
};



export { ChoixmapView };
