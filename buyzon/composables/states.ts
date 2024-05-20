export const useProductData = () =>
  useState<ProductData[]>("productData", () => []);
export const useUserCart = () => useState<ProductData[]>("userCart", () => []);
export const useAuth = () => useState<boolean>("auth", () => false);
export const useUserUId = () => useState<string>("uid", () => "");
