import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import cart from "./cart.vue";
describe("Cart", () => {
  it("can mount the app", async () => {
    const component = await mountSuspended(cart);
    expect(component.html()).toContain("");
  });
});
