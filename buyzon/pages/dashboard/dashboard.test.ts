import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import dashboard from "./index.vue";
describe("Dashboard", () => {
  it("can mount the app", async () => {
    const component = await mountSuspended(dashboard);
    expect(component.html()).toContain("class=");
  }, 10000);
});
