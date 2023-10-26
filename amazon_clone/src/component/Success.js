import React from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { resetCart } from '../redux/amazonSlice';
function Success() {
  
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl text-hoverBg font-semibold">
        Thank you for shopping 
      </h1>



        <Link to="/">
            <button className="mt-6 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 active:bg-blue-600 px-8 py-2 font-titleFont font-semibold text-lg">
              Continue Shopping
            </button>
          </Link>
      {/* </Link> */}
    </div>
  )
}

export default Success
