
import { useEffect, useState } from "react";

function ProductCart() {

  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");

    useEffect(() => {
    // Simulate Firebase fetch
    const fetchProductImages = async () => {
      // Example: Replace with actual Firebase call
      const productImagesFromFirebase = [
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      ];
      setImages(productImagesFromFirebase);
      setCurrentImage(productImagesFromFirebase[1]);
    };

    fetchProductImages();
  }, []);


    const handleMouseEnter = () => {
      if (images.length > 1) {
      console.log("Mouse entered the card");
      setCurrentImage(images[1]); // Set second image
    }
  };

  const handleMouseLeave = () => {
    if (images.length > 0) {
      setCurrentImage(images[0]); // Revert to first image
    }
  };


  return (
    <div className="card bg-base-100 w-96 shadow-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <figure>
      {currentImage ? (<img src={currentImage} alt="Product" className="transition duration-300 h-full object-cover"></img>) : (<span className="loading loading-ring loading-md"></span>)}
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;