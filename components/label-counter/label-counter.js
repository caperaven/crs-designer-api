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
        // if (event.target.dataset.id == "decrease"){
        //     if(this.counter > 1){
        //         this.counter --;                                 // working 
        // }

        // }
        // else if (event.target.dataset.id == "increase"){
        //     this.counter += 1;
        // }



        // Convention attempt
        if(event.target.dataset.action != null){
           await this[event.target.dataset.action](event);
        }
        // this.querySelector("[data-value='0']").innerHTML = this.counter        //working

        event.stopPropagation();
    }

    async increment(event){
        this.counter ++;
        this.querySelector("[data-value='0']").innerHTML = this.counter;
    }

    async decrement(event){
        this.counter --;
        this.querySelector("#decrement").textContent = this.counter;
    }
}

customElements.define("label-counter", LabelCounter);