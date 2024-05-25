type CartData = {
  data: ProductData[];
};

export const useCartStore = defineStore("cart", () => {
  const { getCart } = useUtils();
  const cartData: CartData = reactive({
    data: [],
  });
  const cartSize = computed(() => cartData.data.length);

  async function fetchCartData() {
    cartData.data = await getCart();
  }

  function productInCart(productId: number) {
    let flag = false;
    cartData.data.forEach((item) => {
      if (item.id === productId) flag = true;
    });
    return flag;
  }

  function addItemToCart(product: ProductData) {
    cartData.data.push(product);
  }
  function removeItemFromCart(productId: number) {
    cartData.data = cartData.data.filter((item) => item.id !== productId);
  }
  return {
    cartData,
    cartSize,
    productInCart,
    fetchCartData,
    addItemToCart,
    removeItemFromCart,
  };
});
