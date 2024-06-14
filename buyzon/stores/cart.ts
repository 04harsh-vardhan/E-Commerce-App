type CartData = {
  data: ProductData[];
};

export const useCartStore = defineStore("cart", () => {
  const { getCart, addToCart, removeFromCart } = useUtils();
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
    cartData.data.push({ ...product, quantity: 1 });
    addToCart({ ...product, quantity: 1 });
  }
  function addQuantityToCart(productId: number) {
    cartData.data.forEach((item) => {
      if (item.id === productId) {
        item.quantity++;
        addToCart(item);
      }
    });
  }
  function removeQuantityFromCart(productId: number) {
    cartData.data.forEach((item) => {
      if (item.id === productId) {
        item.quantity--;
        if (item.quantity === 0) {
          cartData.data = cartData.data.filter((item) => item.id !== productId);
          removeFromCart(productId);
        } else {
          addToCart(item);
        }
      }
    });
  }
  function productQuantityInCart(productId: number) {
    let quantity = 0;
    cartData.data.forEach((item) => {
      if (item.id == productId) {
        quantity = item.quantity;
      }
    });
    return quantity;
  }
  return {
    cartData,
    cartSize,
    productInCart,
    fetchCartData,
    addItemToCart,
    removeQuantityFromCart,
    productQuantityInCart,
    addQuantityToCart,
  };
});
