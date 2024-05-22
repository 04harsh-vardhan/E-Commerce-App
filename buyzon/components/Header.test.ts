import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import Header from "./Header.vue";

describe("Header", () => {
  it("can mount the component", async () => {
    const component = await mountSuspended(Header);
    expect(component.html()).toContain("profile");
  });
});
