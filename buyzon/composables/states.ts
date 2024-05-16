export const useProductData = () => useState<ProductData[]>("productData");
export const useAuth = () => useState<boolean>("auth", () => true);
type ProductData = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
