export class MovementActions {
    static async perform(step, context, process, item) {
        await this[step.action](step, context, process, item);
    }

    static async enable(step, context, process, item) {
        const element = await crs.dom.get_element(step.args.element, context, process, item);
        const dragQuery = await crs.process.getValue(step.args.drag_query, context, process, item);
        const dropQuery = await crs.process.getValue(step.args.drop_query, context, process, item);

        const result = Movement.new(element, dragQuery || '[data-drag="true"]', dropQuery || '[data-drop="true"]');

        if (step.args.target != null) {
            await crs.process.setValue(step.args.target, context, process, item);
        }

        return result;
    }

    static async disable(step, context, process, item) {
        const element = await crs.dom.get_element(step.args.element, context, process, item);
        element.__movement?.dispose();
    }
}

class Movement {
    static new(element, dragQuery, dropQuery) {
        const movement = new Movement();
        movement._element = element;
        movement._dragQuery = dragQuery;
        movement._dropQuery = dropQuery;

        element.__movement = movement;
        element.addEventListener("mousedown", movement._mouseDownHandler);

        return movement;
    }

    constructor() {
        this._mouseDownHandler = this.mouseDown.bind(this);
        this._mouseMoveHandler = this.mouseMove.bind(this);
        this._mouseUpHandler = this.mouseUp.bind(this);

        this.x = 0;
        this.y = 0;
    }

    dispose() {
        this._element.removeEventListener("mousedown", this._mouseDownHandler);
        this._mouseDownHandler = null;
        this._mouseMoveHandler = null;
        this._mouseUpHandler = null;

        delete this._element.__movement;
        this._element = null;
        this._dropQuery = null;
        this._dragQuery = null;
    }

    async mouseDown(event) {
        this.x = event.clientX;
        this.y = event.clientY;

        if (event.target.matches(this._dragQuery)) {
            this._layer = await crs.call("dom", "get_animation_layer");
            document.addEventListener("mousemove", this._mouseMoveHandler);
            document.addEventListener("mouseup", this._mouseUpHandler);

            this._moveElement = await crs.call("dom", "clone_for_movement", {
                element: event.target,
                parent: this._layer,
                position: { x: this.x, y: this.y }
            })
        }
    }

    async mouseMove(event) {
        this.x = event.clientX;
        this.y = event.clientY;
        this._moveElement.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    async mouseUp(event) {
        this.x = event.clientX;
        this.y = event.clientY;
        document.removeEventListener("mousemove", this._mouseMoveHandler);
        document.removeEventListener("mouseup", this._mouseUpHandler);
        await crs.call("dom", "clear_animation_layer");
        this._moveElement = null;
    }
}


crs.intent.designer_movement = MovementActions;