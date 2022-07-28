export class HelloWorld extends HTMLElement {
    async connectedCallback(){
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());


    }

    async disconnectedCallback(){

    }
}

customElements.define("hello-world", HelloWorld);