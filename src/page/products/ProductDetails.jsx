import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import axios from "axios";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  // const productsDetails = location.state?.productData || {};
  const [productsDetails, setProductsDetails] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    productsDetails.images ? productsDetails.images[0] : null
  );
  const [selectedColor, setSelectedColor] = useState(
    productsDetails.images ? productsDetails.images[0].color : null
  );
  const [selectedSize, setSelectedSize] = useState(
    productsDetails.attributes ? productsDetails.attributes[0].value : null
  );

  const [quantity, setQuantity] = useState("1");
  // const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://classicit.onrender.com/api/product"
        );
        console.log(response.data);
        const product = response.data.find((detail) => detail._id === id);
        setProductsDetails(product);
        setSelectedImage(product.images ? product.images[0] : null);
        setSelectedColor(product.images ? product.images[0].color : null);
        setSelectedSize(
          product.attributes ? product.attributes[0].value : null
        );
        setIsLoading(false); // Set loading state to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Handle error and set loading state to false
      }
    };

    fetchProducts();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setSelectedColor(image.color);
  };

  const handleColorChange = (color) => {
    const selectedImageByColor = productsDetails.images.find(
      (image) => image.color === color
    );

    if (selectedImageByColor) {
      setSelectedImage(selectedImageByColor);
      setSelectedColor(color);
    }
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  console.log(user?.email);
  const handleCartAdd = async () => {
    if (user) {
      const productData = {
        name: productsDetails?.name,
        price: productsDetails?.sale_price,
        email: user?.email,
        userId: user?._id,
        productId: productsDetails._id,
      };

      try {
        const response = await axios.post(
          "https://classicit.onrender.com/api/cart",
          {
            productData: productData,
          }
        );

        console.log("data cart", response);

        if (response.data._id) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Please Login before adding to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  console.log("single", productsDetails);
  return (
    <ContentWrapper>
      <div className="py-20">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div>
            <div className="flex gap-5">
              <div className="flex border p-5">
                <div>
                  <div className="border">
                    <img
                      src={selectedImage.src}
                      // alt={selectedImage.color}
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                  <div className="flex flex-row gap-3 pt-5">
                    <p className="text-slate-400 font-bold">Select Color:</p>
                    <p>
                      {productsDetails.images.map((image) => (
                        <label key={image.id} style={{ marginRight: "10px" }}>
                          <input
                            type="radio"
                            name="color"
                            value={image.color}
                            checked={selectedColor === image.color}
                            onChange={() => handleColorChange(image.color)}
                          />
                          {image.color}
                        </label>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col pl-5">
                  {productsDetails.images.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => handleImageClick(image)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    >
                      <img
                        src={image.src}
                        alt={image.color}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-bold text-2xl">{productsDetails?.title}</h2>

                <div className="flex flex-row gap-3 py-2">
                  <p className="text-amber-400 font-semibold">Select Size:</p>
                  <p>
                    {productsDetails.attributes.map((size) => (
                      <label key={size.id} style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="size"
                          value={size.value}
                          checked={selectedSize === size.value}
                          onChange={() => handleSizeChange(size.value)}
                        />
                        {size.value}
                      </label>
                    ))}
                  </p>
                </div>

                <div className="flex gap-3 pb-2">
                  <p className="text-amber-400 font-semibold">Price: </p>
                  <p className="text-slate-400 line-through decoration-pink-500">
                    ${productsDetails?.reg_price}
                  </p>
                  <p className="font-bold text-indigo-500">
                    ${productsDetails?.sale_price}
                  </p>
                </div>
                <div style={{ width: "400px" }} className="">
                  <p>{productsDetails?.product_des}</p>
                </div>
                <div onClick={handleCartAdd}>
                  <button className="rounded-md hover:text-white hover:bg-indigo-500 border border-indigo-500 bg-transparent text-indigo-500 transition px-4 py-2 mt-2">
                    Add Cart <i className="fa-light fa-file-circle-info"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

export default ProductDetails;
