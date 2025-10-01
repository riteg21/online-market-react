import { GAMNIT } from "../../../data/products.data";
import { ProductCard } from "./ProductCard";
import { useDebounce } from "../../../hooks/useDebounce";
import { ModalBaggage } from "./modal/ModalBaggage";

export default function GamnitProducts({
  searchTerm,
  isOpenBaggage,
  setIsOpenBaggage,
  countProduct,
  setCountProduct,
}) {
  const debouncedSearch = useDebounce(searchTerm, 400);
  const products = GAMNIT.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  return (
    <div className="flex justify-center mt-15 mb-15 ">
      {isOpenBaggage && (
        <ModalBaggage
          onClose={() => {
            setIsOpenBaggage(false);
          }}
          setCountProduct={setCountProduct}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {products.length ? (
          products.map((product) => (
            <ProductCard
              id={product.id}
              image={product.pic}
              name={product.name}
              price={product.price}
              description={product.description}
              countProduct={countProduct}
              setCountProduct={setCountProduct}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-8 mb-10">
            <img
              src="/not-found2.svg"
              alt="No products found"
              className=" w-130 h-auto"
            />
            <h1 className="mb-14 text-2xl font-extrabold leading-none tracking-tight text-black/70 md:text-5xl lg:text-6xl ">
              Products not found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
