import "./../../components/label-counter/label-counter.js";
import "./../../components/grid-preview/grid-preview.js";

export class CssGridEditor extends crsbinding.classes.BindableElement {
    async connectedCallback() {
        await super.connectedCallback();
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());

        requestAnimationFrame(() => {          
            this.clickedHandler = this.clicked.bind(this);
            this.querySelector('[data-id="top-toolbar"]').addEventListener("click", this.clickedHandler);

        })


    }
    // preLoad() {
    //     this.setProperty("columns", 2);
    //     this.setProperty("rows", 1);
    // }

    async disconnectedCallback() {
        this.querySelector('[data-id="top-toolbar"]').removeEventListener("click", this.clickedHandler);
        this.clickedHandler = null;
    }



    async clicked(event){
        if(event.target.dataset.action != null){
            await this[event.target.dataset.action](event);
        }
        event.stopPropagation();
    }

    async desktop(event){
            console.log("ToDo: desktop event");
    }

    async mobile(event){
            console.log("ToDo: mobile event");
    }

    async reset(event){
        console.log("ToDo: reset event");
    }

    async properties(event){
        console.log("ToDo: properties event");
    }

    async fullscreen(event){
        console.log("ToDo: fullscreen event");
    }

    async close(event){
        console.log("ToDo: close event");
    }

    async cancel(event){
        console.log("ToDo: cancel event");
    }

    async apply(event){
        console.log("ToDo: apply event");
    }

    // async addColumn() {
    //     let columnValue = this.querySelector("[data-label='Columns']").value;
    //     let col = this.getProperty("[data-label='Columns']".value)  // getting value of 5 ? ({contextId: 5})
    //     console.log(columnValue);
    //     console.log(col);
    // }

    async columnCountChanged(event) {
        console.log(event);
    }

    // async addRow() {
    //     let rowValue = this.querySelector("[data-label='Rows']").value;
    // }

    async rowCountChanged(event) {
        console.log(event);
    }


}

customElements.define("css-grid-editor", CssGridEditor);
