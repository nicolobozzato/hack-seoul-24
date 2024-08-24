export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  discountForWow: number;
  color: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
