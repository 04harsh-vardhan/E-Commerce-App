import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import signin from "./signin.vue";
describe("signin", () => {
  it("can mount the app", async () => {
    const component = await mountSuspended(signin);
    expect(component.html()).toContain("");
  });
});
