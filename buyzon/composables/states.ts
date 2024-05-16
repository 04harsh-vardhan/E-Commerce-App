export const useProductData = () => useState<ProductData[]>("productData");
export const useAuth = () => useState<boolean>("auth", () => true);

