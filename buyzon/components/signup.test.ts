import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import signup from "./Signup.vue";
describe("Signup", () => {
  it("can mount the app", async () => {
    const component = await mountSuspended(signup);
    expect(component.html()).toContain("");
  });
});
