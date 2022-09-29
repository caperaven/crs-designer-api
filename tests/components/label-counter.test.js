import { beforeAll, afterAll, afterEach, beforeEach, describe, it} from "https://deno.land/std@0.157.0/testing/bdd.ts";
import { assertEquals, assertExists, assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import {init} from "./../../packages/crs-framework/test/mockups/init.js";
import {createMockChildren} from "./../../packages/crs-framework/test/mockups/child-mock-factory.js";

await init();

beforeAll(async () => {
    await import("./../../components/label-counter/label-counter.js");
})

describe("label-counter tests", () => {
    let instance;

    beforeEach(async () => {
        instance = document.createElement("label-counter");
        instance.querySelector = (query) => {}

        await instance.connectedCallback();
        createMockChildren(instance);
    })

    afterEach(async () => {
        await instance.disconnectedCallback();
    })

    it("initial", () => {
        assertEquals(instance.counter, 1);
    })
})