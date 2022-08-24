/**
 * JHR: Code order is wrong.
 * First properties
 * Then Lifecycle events (constructor, connectedCallback, disconnectedCallback)
 * Then Methods
 */

export class DesignerRepo extends crsbinding.classes.BindableElement{
    get html() { 
        return import.meta.url.replace(".js", ".html");

        // JHR: this does not belong here, move to connected callback
        this.loadHTML();
    }

    preLoad () {
        this.setProperty ("displayStatus", "grid");
    }

    // JHR Make this async because fetch is async
    loadHTML () {
        const status = this.getProperty("displayStatus");
        const file = `/templates/designer-repo/${this.dataset.repo}-${status}.html`;

        // 1. use fetch api to fetch the hml
        // 2. append the html to the ul
    }

    async connectedCallback() {
        await super.connectedCallback();

    }

    async disconnectedCallback () {

        await super.disconnectedCallback();
    }
}

customElements.define("designer-repo", DesignerRepo);