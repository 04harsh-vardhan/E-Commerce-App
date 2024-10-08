export type ProductData = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  brand: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
};

