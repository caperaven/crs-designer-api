/**
 * JHR: Code order is wrong.
 * First properties
 * Then Lifecycle events (constructor, connectedCallback, disconnectedCallback)
 * Then Methods
 */

export class DesignerRepo extends crsbinding.classes.BindableElement{
    static get observedAttribute() {return ["data-repo"]};

    get html() {
        return import.meta.url.replace(".js", ".html");

    }

    async connectedCallback() {
        await super.connectedCallback();
        // this.loadHTML();
        await crs.call("dom_interactive", "enable_resize", {
            element: this,
            resize_query : ".resize",
            options: {}
        })
    }

    async disconnectedCallback () {
        await crs.call("dom_interactive", "disable_resize", {
            element: this
        })
        await super.disconnectedCallback();
    }

    preLoad () {
        this.setProperty ("displayStatus", "grid");
    }

    async displayStatusChanged(newValue) {
        console.log(newValue)
        await this.loadHTML()
    }


    async loadHTML () {
        const status = this.getProperty("displayStatus");

        if(status == null || this.dataset.repo == null) {
            return ;
        }
        const file = `/templates/designer-repo/${this.dataset.repo}-${status}.html`;

        this.container.innerHTML = await fetch(file).then(result => result.text());

    }

    async attributeChangedCallback() {

        await this.loadHTML()
    }

    async filterChanged(newValue) {
        await crs.call("dom_collection", "filter_children", {
            element: this.container,
            filter: newValue
        })
    }
}

customElements.define("designer-repo", DesignerRepo);