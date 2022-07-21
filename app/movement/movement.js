import "./../../components/label-counter/label-counter.js"
import './../../src/  movement-actions.js'

export default class Movement extends crsbinding.classes.ViewBase {
    async connectedCallback() {
        await super.connectedCallback();

        await crs.call("designer_movement", "enable", {
            element: "#vertical",
            drag_query: "li",
            drop_query: "ul"
        })

        await crs.call("designer_movement", "enable", {
            element: "#horizontal",
            drag_query: "li",
            drop_query: "ul"
        })
    }
}