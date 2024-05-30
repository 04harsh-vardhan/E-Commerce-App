type ProductsData = {
  data: ProductData[];
};
export const useProductDataStore = defineStore("ProductsData", () => {
  const { getProducts } = useUtils();
  const productsData: ProductsData = {
    data: [],
  };
  async function fetchData() {
    productsData.data = await getProducts();
  }
  function getProduct(productId: number) {
    return productsData.data.find((item) => item.id === productId);
  }
  return {
    productsData,
    getProduct,
    fetchData,
  };
});
