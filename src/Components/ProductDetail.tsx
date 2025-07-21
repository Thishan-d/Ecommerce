import { useState, useEffect } from "react";
import altProductImage from "../assets/AltProductDetailImage.jpg";
import type { ProductDetailProps } from "../Services/types";

const ProductDetail = ({
  title,
  description,
  actualPrice,
  fakePrice,
  reviewCount,
  rating,
  images = [],
  productQuantity,
  colors = [],
}: ProductDetailProps) => {
  const [mainImage, setMainImage] = useState(
    images.length > 0 ? images[0] : altProductImage
  );
  const [quantity, setQuantity] = useState<number>(productQuantity);

  useEffect(() => {
    setMainImage(images[0]);
    setQuantity(productQuantity);
  }, [productQuantity, images]);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () =>
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={images.length > 0 ? mainImage : altProductImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">
              {title || "Product Title"}
            </h2>
            <p className="text-gray-600 mb-4">
              SKU: {"DT-MS-" + new Date().getMilliseconds() || "TESTSKU"}
            </p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                ${actualPrice || 0}
              </span>
              <span className="text-gray-500 line-through">
                ${fakePrice || 0}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="1 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="2 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="3 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="4 star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="5 star"
                />
              </div>
              <span className="ml-2 text-gray-600">
                {rating || ""} ({reviewCount || 0})
              </span>
            </div>
            <p className="text-gray-700 mb-6">
              {description ||
                "Sample description of the product. This is a placeholder text to give an idea of how the product description will look."}
            </p>

            {colors.length && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  {colors.length > 0
                    ? colors.map((hex, idx) => (
                        <button
                          key={idx}
                          className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2`}
                          style={{ backgroundColor: hex }}
                        />
                      ))
                    : "No colors available"}
                </div>
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decrease}
                  className="w-8 h-8 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  –
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-[60px] text-center bg-gray-100 text-black rounded border-none focus:outline-none py-2"
                />
                <button
                  onClick={increase}
                  className="w-8 h-8 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button className="btn btn-soft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 
                      1.437M7.5 14.25a3 3 0 0 0-3 
                      3h15.75m-12.75-3h11.218c1.121-2.3 
                      2.1-4.684 2.924-7.138a60.114 
                      60.114 0 0 0-16.536-1.84M7.5 
                      14.25 5.106 5.272M6 
                      20.25a.75.75 0 1 1-1.5 0 
                      .75.75 0 0 1 1.5 0Zm12.75 
                      0a.75.75 0 1 1-1.5 0 
                      .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
              <button className="btn btn-soft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                    0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                    3.75 3 5.765 3 8.25c0 7.22 9 
                    12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
