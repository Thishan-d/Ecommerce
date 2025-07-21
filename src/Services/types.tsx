export type ProductDetailProps = {
  title: string;
  description: string;
  actualPrice: number;
  fakePrice?: number;
  reviewCount?: number;
  quantity: number;
  rating: number;
  images: string[];
  productQuantity: number;
  colors?: string[];
};