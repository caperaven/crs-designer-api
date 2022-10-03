export class GridPreview extends crsbinding.classes.BindableElement {
    async connectedCallback() {
        await super.connectedCallback();
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.colCount = 0;
        this.rowCount = 0;
    }

    preLoad() {
        this.setProperty("rows", 1);
        this.setProperty("columns", 1);
    }

    async addColumn() {
        const columns = this.getProperty("columns");
        this.setProperty("columns", columns + 1);
        this.colCount = this.colCount +1;
        console.log(this.colCount);
    }

    async addRow() {
        const rows = this.getProperty("rows");
        this.setProperty("rows", rows + 1);
        this.rowCount = this.rowCount +1;
        console.log(this.rowCount);
    }

    async createGrid() {
        let grid = document.querySelector(".grid");

        for(let i = 0; i < 24; i++) {
             await crs.call("dom", "create_element", {
                 "parent" : grid,
                "tag_name" : "div",
                "styles" : {
                    "width" : "100px",
                    "height" : "100px",
                },
                "dataset" : {
                    "column" : "1"
                },
                "text-content" : "Hello World",
            })
        }
    }

}

customElements.define("grid-preview", GridPreview)