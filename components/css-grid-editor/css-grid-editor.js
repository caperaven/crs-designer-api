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


// export class LabelCounter extends HTMLElement {
//     async connectedCallback() {
//         this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());

//         requestAnimationFrame(() => {
//             // initialize code
//         })
//     }

//     async disconnectedCallback() {

//     }
// }

// customElements.define("label-counter", LabelCounter);




    // ^
    // |
// Not Working, Infinite Loop!!!

// Ask how to Pull Older code and start from scratch.

// Is it okay to copy code to try something differrent , or else what is best way to test something , 
// (dev tools confusing)

// Ask about divs and div border.

// ask about labeled counter (Is that web compoment?)  (infinite loop)