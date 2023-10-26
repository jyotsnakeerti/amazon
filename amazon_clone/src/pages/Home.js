import React, { useEffect } from 'react'
import Banner1 from '../component/home/Banner1'
import Product from '../component/home/Product'
import { useDispatch} from 'react-redux'
import { setAllProducts } from '../redux/amazonSlice'
import { useLoaderData } from 'react-router-dom';
function Home() {

  const data = useLoaderData()
  const productsData=data.data;
  // const products = useSelector((state)=>state.amazon.products)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setAllProducts({allProducts: productsData}))
  },[productsData])
  return (
    <div>
      <Banner1/>
      <div className='w-full -mt-36 py-10'>
        <Product/>
      </div>
    </div>
  )
}

export default Home
