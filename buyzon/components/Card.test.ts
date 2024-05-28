import { it, expect, describe, vi } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import Card from "./Card.vue";
const product = {
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

// vi.mock("../composables/useUserCart", () => {
//   return {
//     useUserCart: () => ({
//       value: [product],
//     }),
//   };
// });

describe("Card", () => {
  it("can mount the App", async () => {
    const component = await mountSuspended(Card, {
      props: product,
    });
    expect(component.html()).toContain("Rs");
  });
  it("image source is passed correctly", async () => {
    const component = await mountSuspended(Card, {
      props: product,
    });
    expect(component.find("img")?.attributes("src")).toContain(
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    );
  });
  it('can add product to cart', async () => {    
    const component = await mountSuspended(Card, {
      props: product,
    });
    console.log(component.vm)
  })
});
