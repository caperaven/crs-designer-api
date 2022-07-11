export class LabelCounter extends HTMLElement{
    async connectedCallback(){
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());

        requestAnimationFrame(() => {
            // initialize code
        })
        // alert("Connected");
    }

    async disconnectedCallback(){

    }
}

customElements.define("label-counter", LabelCounter);