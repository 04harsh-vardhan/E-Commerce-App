
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
  return {
    productsData,
    fetchData,
  };
});
