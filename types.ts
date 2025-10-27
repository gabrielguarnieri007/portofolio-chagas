export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageKeyword: string;
  unit: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}