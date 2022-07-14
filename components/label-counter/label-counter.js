export class LabelCounter extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.counter = 0;
        
        //add click event
        // this.clickHandler = this.clicked.bind(this);  
        // this.addEventListener("click", this.clickHandler);

        requestAnimationFrame(() => {
            // initialize code
            this.querySelector("[data-id='label']").textContent = this.dataset.label;
            this.clickHandler = this.clicked.bind(this);  
            this.addEventListener("click", this.clickHandler);
        })
        // alert("Connected");
    }

    async disconnectedCallback(){
        await this.removeEventListener("click",this.clickHandler);
        this.clickHandler = null;
    }

    async clicked(event){
        // console.log(event)
        console.log(event.target)  
        // Convention attempt
        if(event.target.dataset.action != null){
           await this[event.target.dataset.action](event);
        }
        this.querySelector("[data-id='value']").textContent = this.counter;
        this.dispatchEvent(new CustomEvent("Change", {detail: {value: this.counter}}))
        event.stopPropagation();
    }

    async increment(event){
        if(this.counter >=0){
            this.counter ++;
        }
        

    }

    async decrement(event){
        if(this.counter >=0){
            this.counter --;
        }

    }
}

customElements.define("label-counter", LabelCounter);