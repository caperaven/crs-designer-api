/**
 * JHR: Code order is wrong.
 * First properties
 * Then Lifecycle events (constructor, connectedCallback, disconnectedCallback)
 * Then Methods
 */

export class DesignerRepo extends crsbinding.classes.BindableElement{
    get html() {
        return import.meta.url.replace(".js", ".html");

    }

    async connectedCallback() {
        await super.connectedCallback();
        // this.display = this.querySelector("#display");
        this.loadHTML();
    }

    async disconnectedCallback () {
        // this.display = null;
        await super.disconnectedCallback();
    }

    preLoad () {
        this.setProperty ("displayStatus", "grid");
    }

    displayStatusChanged() {
        this.loadHTML()
    }


    async loadHTML () {
        const status = this.getProperty("displayStatus");
        const file = `/templates/designer-repo/${this.dataset.repo}-${status}.html`;

        // let var1 = await fetch(file).then(result => result.text());
        // console.log(var1);

        // this.display.innerHTML = await fetch(file).then(result => result.text());

    // this.container.innerHTML = await fetch(file).then(result => result.text());

    // 1. use fetch api to fetch the html
    // 2. append the html to the ul
    }
}

customElements.define("designer-repo", DesignerRepo);