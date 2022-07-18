import "./../../components/label-counter/label-counter.js"

export class CssGridEditor extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());

        requestAnimationFrame(() => {
            // initialize code
        })
    }

    async disconnectedCallback() {

    }
}

customElements.define("css-grid-editor", CssGridEditor);
