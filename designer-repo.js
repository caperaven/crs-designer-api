export class DesignerRepo extends crsbinding.classes.BindableElement{
    get html() { 
        return import.meta.url.replace(".js", ".html");
    }

    preLoad () {
        this.setProperty ("displayStatus", "grid");
    }




    async connectedCallback() {
        await super.connectedCallback();
        this.loadHTML();
        this.display = this.querySelector("#display");

    }

    async disconnectedCallback () {

        await super.disconnectedCallback();
    }

    async loadHTML () {
        const status = this.getProperty("displayStatus");
        const file = `/templates/designer-repo/${this.dataset.repo}-${status}.html`;

        let var1 = await fetch(file).then(result => result.text());
        // console.log(var1);
        // console.log(file);


        this.display.innerHTML = await fetch(file).then(result => result.text());

        
        
        // 1. use fetch api to fetch the html
        // 2. append the html to the ul
    }

}
customElements.define("designer-repo", DesignerRepo);
