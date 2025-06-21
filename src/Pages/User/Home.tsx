import ProductCard from "../../Components/ProductCard";

function Home() {
  const products = Array.from({ length: 10 });

  return (
    <div className="home base-200 p-10">
      {/* <h1>Welcome to Our Store</h1>
      <p>Explore our products and enjoy shopping!</p> */}
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 justify-items-center">
          {products.map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
