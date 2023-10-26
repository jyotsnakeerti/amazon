import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addTofavorite } from "../redux/amazonSlice";
import { useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ToastContainer, toast} from "react-toastify";

function Id() {

  const dispatch = useDispatch();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const queryParams = new URLSearchParams(location.search);
    const productData = {
      _id: queryParams.get("id"),
      title: queryParams.get("title"),
      price: queryParams.get("price"),
      description: queryParams.get("description"),
      category: queryParams.get("category"),
      image: queryParams.get("image"),
    };

    setProduct(productData);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="max-w-screen-lg mx-auto px-4 py-4 md:py-10">
    
        
    {isLoading ? (
      <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
        <p>Your product is loading...</p>
      </div>
    ) : (
      <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
          <img
            src={product.image}
            alt="product"
            width={500}
            height={500}
          />
          <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300">
            <span
              // onClick={() =>
              //   dispatch(
              //     addToCart({
              //       _id:product._id,
              //                   title:product.title,
              //                   price:product.price,
              //                   description:product.description,
              //                   category:product.category,
              //                   image:product.image,
              //                   quantity:1,
              //     }) & toast.success('Product is added')
              //   )
              // }
              onClick={() => {
                const productToAdd = {
                  id: product._id,
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  category: product.category,
                  image: product.image,
                  quantity: 1,
                };
                dispatch(addToCart(productToAdd));
                toast.success('Product is added');
              }}
              
              
              className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
            >
              <ShoppingCartIcon/>
            </span>
            <span
              onClick={() =>
                dispatch(
                  addTofavorite({
                    id:product._id,
                                title:product.title,
                                price:product.price,
                                description:product.description,
                                category:product.category,
                                image:product.image,
                                quantity:1,
                  })
                )
              }
              className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
            >
              <FavoriteIcon/>
            </span>
            
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
          <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
            {product.category}
          </p>
          <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
            {product.title}
          </h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div>
            <p className="text-base text-gray-600 flex items-center gap-1">
              Price:
              <span className="text-lg text-amazon_blue font-semibold">
                ${product.price} 
              </span>
            </p>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id:product._id,
                                title:product.title,
                                price:product.price,
                                description:product.description,
                                category:product.category,
                                image:product.image,
                                quantity:1,
                  }) 
                ) & toast.success('Product is added')
              }
              className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    )}
    <div>
            <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss  // Corrected prop name
            draggable
            pauseOnHover
            theme="dark"
        />
        </div>
  </div>
  )
}

export default Id
