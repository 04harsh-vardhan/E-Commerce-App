import { it, expect, describe } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import FilterCard from "./FilterCard.vue";
describe("FilterCard", () => {
  it("can mount the app", async () => {
    const component = await mountSuspended(FilterCard);
    expect(component.html()).toContain("Price");
  });
});
