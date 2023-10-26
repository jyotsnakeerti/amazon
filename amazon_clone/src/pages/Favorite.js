import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { addToCart,  deleteFavorite } from "../redux/amazonSlice";
import ResetFav from "../component/ResetFav";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";

function Favorite() {
  const dispatch = useDispatch()
  const fav = useSelector((state)=>state.amazon.fav)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      {fav.length > 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold text-amazon_blue">
              Favorite Items
            </p>
          </div>
            <div>
              {
                fav.map((item)=>(
                  <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2">
              <img src={item.image} alt="Product" width={150} height={150} />
              <div className="flex items-center px-2 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm text-gray-600">
                   Price:{" "}
                    <span className="font-semibold text-amazon_blue">
                    ${item.price} 
                    </span>
                  </p>
                  <div className="flex gap-8">
                  <button
                    onClick={() => {
                      // if (!fav.some(favoriteItem => favoriteItem.id === item.id)) {
                      dispatch(
                        addToCart({
                            id:item.id,
                            title:item.title,
                            price:item.price,
                            description:item.description,
                            category:item.category,
                            image:item.image,
                            quantity:1,
                        })
                      ) && dispatch(deleteFavorite(item.id));
                      // }
                    }}
                    className="w-44 h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow duration-300 hover:text-black mt-2"
                  >
                    add to cart
                  </button>
                  <button
                    onClick={()=>{
                      dispatch(deleteFavorite(item.id));
                  }}
                  className="w-44 h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow duration-300 hover:text-black mt-2"
                  >Delete Item 
                  </button>
                  </div>
                  
                </div>
              </div>
            </div>
                ))
              }
              <ResetFav />
            </div>
            </div>
      ) : (
        <div className="bg-white h-96  flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1>Nothing is available in the Favorite list</h1>
          <Link to="/">
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
              go to shopping
            </button>
          </Link>
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

export default Favorite
