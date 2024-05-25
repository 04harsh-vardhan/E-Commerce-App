type WishlistData = {
  data: ProductData[];
};

export const useWishlistStore = defineStore("wishlist", () => {
  const { getWishlist } = useUtils();

  const wishlistData: WishlistData = reactive({
    data: [],
  });
  const wishlistSize = computed(() => wishlistData.data.length);

  async function fetchWishlistData() {
    wishlistData.data = await getWishlist();
  }

  function productInWishlist(productId: number) {
    let flag = false;
    wishlistData.data.forEach((item) => {
      if (item.id === productId) flag = true;
    });
    return flag;
  }

  function addItemToWishlist(product: ProductData) {
    wishlistData.data.push(product);
  }
  function removeItemFromWishlist(productId: number) {
    wishlistData.data = wishlistData.data.filter(
      (item) => item.id !== productId
    );
  }
  return {
    wishlistData,
    wishlistSize,
    productInWishlist,
    fetchWishlistData,
    addItemToWishlist,
    removeItemFromWishlist,
  };
});
