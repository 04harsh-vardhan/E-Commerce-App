import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import Home from "./Home.vue";
describe("Home", () => {
  it("can mount the app", async () => {
    const component = await mountSuspended(Home);
    expect(component.html()).toContain("Welcome to Our Store");
  });
});
