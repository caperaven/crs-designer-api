export class GridPreview extends crsbinding.classes.BindableElement {
    async connectedCallback() {
        await super.connectedCallback();
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.colCount = 0;
        this.rowCount = 0;
        this.gridWindow = this.querySelector(".grid-window");

        requestAnimationFrame(() => {
            this.clickHandler = this.clicked.bind(this);  
            this.addEventListener("click", this.clickHandler);
        });

    }

    preLoad() {
        this.setProperty("rows", 1);
        this.setProperty("columns", 1);
        console.log("page loaded");
    }

    async disconnectedCallback() {
        await this.removeEventListener("click",this.clickHandler);
        this.clickHandler = null;
    }

    async clicked(event){ 
        // if(event.target.dataset.action != null){
        //    await this[event.target.dataset.action](event);
        // }
        // this.querySelector("[data-id='value']").textContent = this.counter;
        // this.dispatchEvent(new CustomEvent("change", {detail: {value: this.counter}}))
        // event.stopPropagation();
        if(event.target == this.querySelector("#add-row")) {
            console.log("row clicked");
            this.addRow()
        }

        if(event.target == this.querySelector("#add-col")) {
            console.log("col clicked");
            this.addColumn()
        }

        if(event.target == this.querySelector("#build-grid")) {
            console.log("grid clicked");
            this.drawGrid();
        }
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

    // async createGrid(event) {
        // for(let i = 0; i < 24; i++) {
        //      await crs.call("dom", "create_element", {
        //          "parent" : grid,
        //         "tag_name" : "div",
        //         "styles" : {
        //             "width" : "100px",
        //             "height" : "100px",
        //         },
        //         "dataset" : {
        //             "column" : "1"
        //         },
        //         "text-content" : "Hello World",
        //     })
        //     console.log(i);
        //     grid.appendChild(i);
        // for(let i = 0; i < 6; i++) {
        //     let row = document.createElement("div");
        //     row.id = "row" + i;
        //     row.style.height = "100px";
        //     row.style.width = "100px";
        //     row.style.border = "1px solid black";
        //     this.gridWindow.appendChild(row);
        //     console.log(row);
        // }
        // }
        async drawGrid() {
            // let grid = document.querySelector(".grid1")
            // let rowCount = 0;
            for(let i=0; i < 4; i++) {
                let col = document.createElement("div")
                col.style.width = "100px";
                col.style.height = "100px";
                col.style.backgroundColor = "blue";
                col.style.border = "1px solid silver";
                col.style.color="white";
                col.textContent = "hello";
                col.setAttribute("data-col", i)
                this.gridWindow.appendChild(col);

                for(let x=0; x <4; x++) {
                    let row = document.createElement("div")
                    row.style.width = "100px";
                    row.style.height = "100px";
                    row.style.backgroundColor = "limegreen";
                    row.style.border = "1px solid silver";
                    row.setAttribute("data-row", x)
                    this.gridWindow.appendChild(row);
                }
            }
        }
    

}

customElements.define("grid-preview", GridPreview)