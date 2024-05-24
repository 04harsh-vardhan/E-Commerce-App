export const useUserCart = () => useState<ProductData[]>("userCart", () => []);
export const useUserWishlist = () =>
  useState<ProductData[]>("userWishlist", () => []);
export const useAuth = () => useState<boolean>("auth", () => true);
export const useUserUId = () => useState<string>("uid", () => "");
export const usefeatureState = () => useState<string>("feature", () => "");
