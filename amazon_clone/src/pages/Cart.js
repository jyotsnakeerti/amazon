import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/amazonSlice";
import { emptyCart } from '../assests';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';


function Cart() {

  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const products = useSelector((state)=>state.amazon.products)
  const userInfo = useSelector((state)=>state.amazon.userInfo)
  
  const [totalPrice, setTotalPrice] = useState("")
  useEffect(()=>{
    let total=0;
    products.map((item)=>{
      total+= item.price* item.quantity;
      return setTotalPrice(total.toFixed(2))
    })
  },[products])

  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to reset your items from the cart?"
    ); 
    toast.error('Your cart is empty')
    if (confirmReset) {
      dispatch(resetCart());
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handlecart = () => {
    
      // dispatch(resetCart());
  };

  const handlePay= async() => {
    const stripe= await loadStripe("pk_test_51Nec6XSABs1CDGvtN53dhQk4CRzctKI29RIpRbbVPNYOHAjYSv4FfQsxmty4AcowvzNXe3UXfyQN7nnp55KsvLwC00L4iJLrV9");

    const body = {
      product:products
    }
    const headers={
      "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:8000/api/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    });

    if(result.error){
      console.log(result.error);
    }

    // setPayNow(true);
    // navigate('/success');
    dispatch(resetCart());
  }
  

  return (
    <div className='w-full bg-gray-100 p-4'>
      {
        products.length > 0 ? (<div className='container mx-auto h-auto grid grid-cols-5 gap-8'>
        <div className='w-full h-full bg-white px-4 col-span-4'>
          <div className='font-titleFont hidden xl:flex items-center justify-between border-b-[1px] border-b-gray-400 py-3'>
            <h2 className='text-3xl font-medium'>Shopping cart</h2>
            <h4 className='text-xl font-normal'>Subtotal</h4>
          </div>

          <div>
            {
              products.map((item)=>(
                <div key={item.id} className='w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6'>
                  <div className='w-full flex items-center justify-between gap-6'>
                    <div className='w-1/5'>
                    <img 
                    className='w-full h-44 object-contain' 
                    src={item.image} 
                    alt="productimage">
                    </img>
                    </div>
                    <div className='w-4/5'>
                      <h2 className='font-semibold text-lg'>{item.title}</h2>
                      {/* {item.description.substring(0,200)} */}
                      <p className='text-sm'>{item.description && item.description.substring(0, 200)}</p>
                      <p className='text-base'>Unit Price <span className='font-semibold'>${item.price}</span></p>
                      <div className='bg-[#f0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md'>
                        <p>Qty:</p>
                        <p onClick={()=>dispatch(decreaseQuantity(item.id))} className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'>-</p>
                        <p>{item.quantity}</p>
                        <p onClick={()=>dispatch(increaseQuantity(item.id))} className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'>+</p>
                      </div>
                      <button 
                        onClick={()=>dispatch(deleteItem(item.id))} className='bg-amazon_blue w-36 py-1 font-medium rounded-lg text-white mt-2 hover:bg-amazon_yellow hover:text-black duration-300'>
                        Delete Item
                      </button>
                    </div>
                    <div >
                      <p className='text-lg font-titleFont font-semibold'>
                      ${item.price *item.quantity}
                      </p>
                    </div>
                  </div>
              </div>
              ))}
          </div>
          <div 
          onClick={() => {
            // dispatch(resetCart());
            handleResetCart();
          }}
           className='w-full py-2'>
            <button className='px-10 py-2 font-medium bg-amazon_blue hover:bg-amazon_yellow hover:text-black text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide'>
              Reset cart
            </button>
          </div>
        </div>
        <div className='w-full h-60  bg-white col-span-1 flex flex-col justify-center items-center p-4'>
          <div>
            <p className='flex gap-2 items-start text-sm'>
              <span className='bg-white text-green-500 rounded-full'><CheckCircleIcon/></span>{" "}
              Your order qualifies for FREE Shipping Choose this option at
              checkout. See details....
            </p>
          </div>
          <div>
            <p className='font-semibold px-10 py-1 flex items-center gap-2 justify-between'>
              Total: <span className='text-lg font-bold'>${totalPrice}</span></p>
          </div>
          { userInfo ? (
            // <Link to='/success'>
            <div>
               <div className='flex flex-col items-center relative '>

              <button onClick={handlePay} className='w-[150px] relative font-titleFont font-medium text-base bg-gradient-to-tr from-blue-400 to-blue-200 border hover:from-blue-300 hover:to-blue-400 border-blue-500 hover:border-blue-700 active:bg-gradient-to-bl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md mt-3'>
              Proceed to Pay
             </button>
              </div>
            </div>
              
            // {/* </Link> */}
          ): (
            <div className='flex flex-col items-center'>
          <button className='w-full font-titleFont font-medium text-base bg-gradient-to-tr from-blue-400 to-blue-200 border hover:from-blue-300 hover:to-blue-400 border-blue-500 hover:border-blue-700 active:bg-gradient-to-bl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md mt-3'>
            Proceed to Pay
          </button>
          <p className='text-xs mt-1 text-red-500 font-semibold animate-bounce'>
            Please login to Continue
          </p>
          </div>
          )
        }
        </div>
      </div>) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='flex justify-center items-center gap-4 py-10'>
        <div>
          <img 
            className='w-80 rounded-lg mx-auto' 
            src={emptyCart} 
            alt="emptycartImg">
          </img>
        </div>
        <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg'>
          <h1 className='font-titleFont text-xl font-bold'>Your Cart feels Lonely.</h1>
          <p className="text-sm text-center">
            {" "}
            Your Shopping cart lives to serve. Give it purpose - fill it with
            books, electronics, videos, etc. and make it happy.
          </p>
          <Link to="/">
            <button className="mt-6 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 active:bg-blue-700 px-8 py-2 font-titleFont font-semibold text-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
        </motion.div> 
        )
      }
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

export default Cart

