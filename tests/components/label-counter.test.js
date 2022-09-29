import { beforeAll, afterAll, afterEach, beforeEach, describe, it} from "https://deno.land/std@0.157.0/testing/bdd.ts";
import { assertEquals, assertExists, assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import {init} from "./../../packages/crs-framework/test/mockups/init.js";
import {createMockChildren} from "./../../packages/crs-framework/test/mockups/child-mock-factory.js";
import {ElementMock} from "../../packages/crs-framework/test/mockups/element-mock.js";

await init();

beforeAll(async () => {
    await import("./../../components/label-counter/label-counter.js");
})

describe("label-counter tests", () => {
    let instance;

    beforeEach(async () => {
        instance = document.createElement("label-counter");
        instance.dataset.label = "Test Label";
        instance.queryResults["[data-id='label']"] = new ElementMock();

        await instance.connectedCallback();
        createMockChildren(instance);
    })

    afterEach(async () => {
        await instance.disconnectedCallback();
    })

    it("initial", async () => {
        assertEquals(instance.counter, 1);
        assertEquals(instance.queryResults["[data-id='label']"].textContent, "Test Label");
    })

    it("update counter", async () => {
        assertEquals(instance.counter, 1);

        const btnIncrease = instance.querySelector('[data-id="increase"]');
        const btnDecrease = instance.querySelector('[data-id="decrease"]');
        const label = instance.querySelector("[data-id='value']");

        await instance.clicked({ target: btnIncrease, stopPropagation: () => {} });
        assertEquals(instance.counter, 2);
        assertEquals(label.textContent, 2);

        await instance.clicked({ target: btnDecrease, stopPropagation: () => {} });
        assertEquals(instance.counter, 1);
        assertEquals(label.textContent, 1);
    })
})