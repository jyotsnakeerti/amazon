import React from 'react';
// import { productsData } from '../../api/Api';
import { useLoaderData } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
// import ApiIcon from '@mui/icons-material/Api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { addToCart, addTofavorite } from '../../redux/amazonSlice';
import { Link } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";

const Product= () => {

    const dispatch = useDispatch()
    const data = useLoaderData()
    const productsData=data.data;
    
    return (
        <div className='max-w-screen-2xl mx-auto grid grid-cols-4 gap-10 px-4 '>
            {
                productsData.map((item)=>(
                    <div key={item.id} className='bg-white h-auto border-[1px] border-gray-300 py-7 z-30 hover:border-transparent shadow-none hover:shadow-textShadow duration-200 flex flex-col gap-4 relative overflow-hidden'>
                        <span className='text-xs capitalize italic absolute top-2 right-2 text-gray-500'>{item.category}</span>
                        <div  className='w-full h-auto flex items-center justify-center relative group'>
                                <Link
                                    to={{
                                    pathname: `/${item.id}`,
                                    search: `?id=${item.id}&title=${item.title}&price=${item.price}&description=${item.description}&category=${item.category}&image=${item.image}`,
                                }}
                                >
                        <img className='w-52 h-64 object-contain' 
                            src={item.image} 
                            alt="productImg">
                        </img>
                    </Link> 
                    <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300">
                        <span
                        onClick={() =>
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
                            ) & toast.success('Product is added')
                        }
                        className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                        >
                        <ShoppingCartIcon/>
                        </span>
                        <span
                            onClick={() =>
                                dispatch(
                                addTofavorite({
                                    id:item.id,
                                            title:item.title,
                                            price:item.price,
                                            description:item.description,
                                            category:item.category,
                                            image:item.image,
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
                        <div className='px-4 z-10 bg-white'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-titleFont tracking-wide text-lg text-amazon_blue font-medium'>{item.title.substring(0,20)}</h2>
                                <p className='text-sm text-gray-600 font-semibold'>${item.price}</p>
                            </div>
                            <div>
                                <p className='text-sm'>{item.description.substring(0,80)}...</p>
                                <div className='text-yellow-300'>
                                    <StarIcon/>
                                    <StarIcon/>
                                    <StarIcon/>
                                </div>
                            </div>
                            <button onClick={() => {
                                dispatch(addToCart({
                                    id: item.id,
                                    title: item.title,
                                    price: item.price,
                                    description: item.description,
                                    category: item.category,
                                    image: item.image,
                                    quantity: 1,
                                }));
                                toast.success("Product is added");
                            }} className='w-full font-titleFont font-medium text-base bg-gradient-to-tr from-blue-400 to-blue-200 hover:from-blue-300 hover:to-blue-400 border-blue-500 hover:border-blue-700 active:bg-gradient-to-bl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md mt-3'>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    
                ))
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

export default Product;



