import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CowndownTimer from "../../components/CowntownTimer/CowndownTimer";
import LoaderSpiner from "../../components/Loader/LoaderSpiner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("products", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://classicit.onrender.com/api/product"
        );
        console.log(response.data);
        setProducts(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-20">
      <h2 className="text-4xl font-bold text-center  py-4">
        SPECIALS <span className="text-yellow-400">OFFER</span>
      </h2>
      {loading? <LoaderSpiner/>: (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="text-center group bg-gray-300 dark:bg-slate-600 p-2"
          >
            <div className="hover:w-auto hover:h-auto">
              {/* Display the first image by default */}
              <img
                style={{ width: "300px", height: "300px" }}
                className="mx-auto group-hover:hidden block img"
                src={product.images[0]?.src}
                alt=""
              />
              {/* Display the second image on hover */}
              <img
                style={{ width: "300px", height: "300px" }}
                className="mx-auto group-hover:block hidden hoverImg"
                src={product.images[1]?.src}
                alt=""
              />
            </div>

            <h2 className="font-bold text-black dark:text-white">
              {product.title}
            </h2>
            <p className="text-slate-400">{product.brand}</p>
            <div className="flex justify-center items-center gap-3">
              <p className="text-slate-400 line-through decoration-pink-500">
                ${product.reg_price}
              </p>
              <p className="font-bold text-indigo-500">${product.sale_price}</p>
            </div>
            <div className="bg-violet-300 rounded-lg py-1">
              <CowndownTimer offerTill={product.offerDate} />
            </div>
            <Link
              to={{
                pathname: `/product/details/${product._id}`,
                state: { productData: product },
              }}
            >
              <button className="rounded-md hover:text-white hover:bg-indigo-500 border border-indigo-500 bg-transparent text-indigo-500 transition px-4 py-2 mt-2">
                Details <i className="fa-light fa-file-circle-info"></i>
              </button>
            </Link>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Products;

