import "./../../components/label-counter/label-counter.js"

export class CssGridEditor extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        
        
        requestAnimationFrame(() => {
            // initialize code
            this.querySelector('button').addEventListener("click", this.clickedHandler);
            this.clickedHandler = this.click.bind(this);
            this.addEventListener("click", this.clickedHandler);
        })
    }

    async disconnectedCallback() {
        await this.removeEventListener("click",this.clickedHandler);
        this.clickedHandler = null;
    }

    async clickedHandler(event) {
        console.log(this);
        alert('clicked a button');
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
}

customElements.define("css-grid-editor", CssGridEditor);
