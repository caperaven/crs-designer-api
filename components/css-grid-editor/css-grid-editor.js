import "./../../components/label-counter/label-counter.js"

export class CssGridEditor extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.buttonAction = null;
        
        requestAnimationFrame(() => {
            // initialize code
            this.clickHandler = this.clicked.bind(this);  
            this.addEventListener("click", this.clickHandler);
        })
    }

    async disconnectedCallback() {
        await this.removeEventListener("click",this.clickHandler);
        this.clickHandler = null;
    }

    async clickHandler(event) {
        if(event.target.dataset.action != null){
            await this[event.target.dataset.action](event);
         }

        event.stopPropagation();
        
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
}

customElements.define("css-grid-editor", CssGridEditor);
