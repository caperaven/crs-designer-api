export class LabelCounter extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.counter = 0;

        requestAnimationFrame(() => {
            // initialize code
            this.querySelector("[data-id='label']").textContent = this.dataset.label;
            this.clickHandler = this.clicked.bind(this);  
            this.addEventListener("click", this.clickHandler);
        })
    }

    async disconnectedCallback(){
        await this.removeEventListener("click",this.clickHandler);
        this.clickHandler = null;
    }

    async clicked(event){
        console.log(event.target)  
        if(event.target.dataset.action != null){
           await this[event.target.dataset.action](event);
        }
        this.querySelector("[data-id='value']").textContent = this.counter;
        this.dispatchEvent(new CustomEvent("Change", {detail: {value: this.counter}}))
        console.log(event.detail);
        event.stopPropagation();
    }

    async increment(event){
        this.counter ++;
        if(this.counter == 0){
            alert("Should at least have 1")
        }
    }

    async decrement(event){
        if(this.counter == 0){
            alert("Should at least have 1")
        }
        else(this.counter --)
    }
}

customElements.define("label-counter", LabelCounter);