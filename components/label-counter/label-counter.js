export class LabelCounter extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.dataset.value = 0;
        this.plus = this.querySelector(".increase");
        this.minus = this.querySelector(".decrease");

        //add click event
        this.clickHandler = this.clicked.bind(this);  
        this.addEventListener("click", this.clickHandler);

        requestAnimationFrame(() => {
            // initialize code
            this.querySelector("[data-id='label']").textContent = this.dataset.label;
        })
        // alert("Connected");
    }

    async disconnectedCallback(){
        await this.removeEventListener("click",this.clickHandler);
        this.clickHandler = null;
    }

    async clicked(event){
        if (event.target.dataset.id == "decrease"){
            if(this.dataset.value > 1){
                this.dataset.value --;
        }
        }
        else if (event.target.dataset.id == "increase"){
            this.dataset.value += 1;
        }

    }

    renderCounter() {
        document.getElementById("value").innerHTML = this.counter
    }
}

customElements.define("label-counter", LabelCounter);
