import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // if using React Router
import ProductDetail from "../../Components/ProductDetail";

type Product = {
  title: string;
  description: string;
  actualPrice: number;
  fakePrice?: number;
  reviewCount?: number;
  rating: number;
  images: string[];
  productQuantity: number;
  colors?: string[];
};

const ProductPage = () => {
  // Suppose get these data using an API call
  const dummyProductData = {
    title: "Premium Wireless Headphones",
    sku: "WH1000XM4",
    description:
      "Experience premium sound quality and industry-leading noise cancellation with these wireless headphones. Perfect for music lovers and frequent travelers.",
    actualPrice: 349.99,
    fakePrice: 399.99,
    rating: 4.5,
    reviewCount: 120,
    productQuantity: 15,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
      "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
      "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
      "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    ],
    colors: ["#c6762f", "#2fc65d", "#3a2fc6"],
  };

  const { productId } = useParams(); // e.g. from /product/:productId
  const [product, setProduct] = useState<Product | null>(dummyProductData); //set initial state to null when using API call
  const [loading, setLoading] = useState(false); // change this to true when using API call

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center p-10">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="text-center p-10 text-red-500">Product not found.</div>
    );
  }

  return (
    <ProductDetail
      title={product.title}
      description={product.description}
      actualPrice={product.actualPrice}
      fakePrice={product.fakePrice}
      reviewCount={product.reviewCount}
      rating={product.rating}
      images={product.images}
      productQuantity={product.productQuantity}
      colors={product.colors}
    />
  );
};

export default ProductPage;
