export default class GridPreview extends crsbinding.classes.ViewBase {
    async connectedCallback() {
        await super.connectedCallback();
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

    /**
     * This function will draw the grid preview accoring to col and row count
     * @returns {Promise<void>}
     */
    async drawGrid() {
        let grid = document.querySelector(".grid")
        let rowCount = 0;
        for(let i=0; i < 4; i++) {
            let col = document.createElement("div")
            col.style.width = "100px";
            col.style.height = "100px";
            col.style.backgroundColor = "blue";
            col.style.border = "1px solid silver";
            col.style.color="white";
            col.textContent = "hello";
            col.setAttribute("data-col", i)
            grid.appendChild(col);
            for(let x=0; x <4; x++) {
                let row = document.createElement("div")
                row.style.width = "100px";
                row.style.height = "100px";
                row.style.backgroundColor = "limegreen";
                row.style.border = "1px solid silver";
                row.setAttribute("data-row", x)
                grid.appendChild(row);
            }
        }
    }

}