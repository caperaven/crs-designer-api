export class LabelCounter extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.counter = 0;
        

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

        if(event.target.dataset.label == "Rows"){
        if (event.target.dataset.id == "decrease"){
            if(this.counter > 1){
                this.counter --;
                document.getElementById("value").innerHTML = this.counter
        }}

        }
        else if (event.target.dataset.id == "increase"){
            this.counter += 1;
            document.getElementById("value").innerHTML = this.counter
        }
        // Attempt to decrease the counter in Columns LabelCounter

        // else if (event.target.dataset.id == "Columns") {
        //     if (event.target.dataset.id == "increase"){
        //         this.counter += 1;
        //         document.getElementById("value").innerHTML = this.counter
        // }}



        event.stopPropagation();
    }

    rowCounter(event) {
        document.querySelector("#Rows").textContent = this.counter
    }

    columnCounter(event) {
        document.querySelector("#Columns").textContent = this.counter
    }
}

customElements.define("label-counter", LabelCounter);
