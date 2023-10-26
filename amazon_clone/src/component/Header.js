import React, { useState,useRef, useEffect } from 'react'
import { logo1 } from '../assests'
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { allItems } from '../constants';
import HeaderBottom from './HeaderBottom';
import { Link } from 'react-router-dom';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useDispatch, useSelector } from 'react-redux';
// import amazonReducer from "../redux/amazonSlice";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from '../redux/amazonSlice';
// import SearchProducts from './SearchProducts';


function Header() {
    const auth = getAuth();
    const dispatch = useDispatch()
    const [showAll, setShowAll]=useState(false)
    const products = useSelector((state)=>state.amazon.products)
    const userInfo = useSelector((state)=>state.amazon.userInfo)
    const allProducts = useSelector((state)=>state.amazon.allProducts)
    const fav = useSelector((state)=>state.amazon.fav)
    const ref = useRef();

    const [allData,setAllData] = useState([])

    useEffect(() => {
      document.body.addEventListener("click", (e) => {
        if (e.target.contains(ref.current)) {
          showAll && setShowAll(false);
        }
      });
    }, [ref, showAll]);

    const handleLogout=()=>{
        signOut(auth)
            .then(()=>{
                console.log('Signed out successfully')
                dispatch(userSignOut())
            })
            .catch((error)=>{
                console.log(error)
            })
    }
  
    useEffect(()=>{
        setAllData(allProducts.allProducts)
    },[allProducts])

    // search Area
    const [searchQuery,setSearchQuery]= useState("")
    const [filterProducts,setFilterProducts] = useState([])

    const handleSearch = (e)=>{
        setSearchQuery(e.target.value);
    }
    const handleSearchIconClick = () => {
        setSearchQuery('');
    };
    useEffect(()=>{
        // const filtered = allData.filter((item)=> item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()))
        // console.log(allData)
        const filtered = allData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilterProducts(filtered)
    },[searchQuery])

  return (
    <div className='w-full sticky top-0 z-50 ' >
        <div className='w-full bg-amazon_blue text-white  flex items-center gap-4'>

            <Link to="/">
                <div className='headerHover'>
                    <img className='w-24 mt-2' src={logo1} alt='logo' ></img>
                </div>
            </Link>

            <div className='headerHover '>
                <LocationOnIcon/>
                <p className='text-sm text-lightText font-light flex flex-col'>
                    Delivery to{" "}
                <span className='text-sm font-semibold -mt-1 text-whiteText'>Bangalore</span>
                </p>
            </div>

            <div className='h-10 rounded-md flex flex-grow relative'>
                <span onClick={()=>setShowAll(!showAll)} 
                className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-t1-md rounded-b1-md'>
                    All <span></span><ArrowDropDownIcon/>
                    </span>
                    {showAll && (
                            <div>
                                <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                                     {
                                        allItems.map((item)=>(
                                            <li className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200' key={item._id}>{item.title}</li>
                                        ))
                                     }
                                </ul>
                            </div>
                        )
                    }
                <input 
                    onChange={handleSearch} 
                    value={searchQuery}
                    className='h-full text-base text-amazon_blue flex-grow outline-none border-none px-2' type='text'/>
                <span onClick={handleSearchIconClick} className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#a4b2e3] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
                    <SearchIcon/></span>
                
                {/* search field */}
                {searchQuery && 
                    <div className='absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black'>
                        {
                            filterProducts.length >0 ? 
                            (
                            <>
                            {searchQuery && filterProducts.map((item)=>(
                                <Link
                                key={item._id}
                                className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                                to={{
                                pathname: `${item._id}`,
                                search: `?id=${item.id}
                                &title=${item.title}
                                &price=${item.price}
                                &description=${item.description}
                                &category=${item.category}
                                &image=${item.image}`,
                                
                                }}
                                
                        onClick={() => setSearchQuery("")}
                      >
                        <img className="w-24" src={item.image} alt="productImage" />
                    <div>
                        <p className="text-xs -mb-1">
                        {item.category}
                     </p>
                    <p className="text-lg font-medium">{item.title}</p>
                    <p className="text-xs">{item.description.substring(0, 100)}</p>
                    <p className="text-sm flex items-center gap-1">
                    price:{" "}
                    <span className="font-semibold">
                    ${item.price}
                     </span>
                    </p>
                    </div>
                        

                      </Link>
                            ))
                            }               
                            </>
                            ):(
                                <div className='bg-gray-50 flex items-center justify-center py-6 px-5 rounded-lg shadow-lg '>
                                    <p className='text-xl font-semibold animate-bounce '>Nothing Matched with your search Keyword.Please Try Again</p>
                                </div>
                            )
                        }
                    </div>
                }
            </div>

            <Link to="/signin">
                <div className="flex flex-col items-start justify-center headerHover">
                {
                    userInfo?(
                        <p className="text-sm text-gray-100 font-medium">
                        {userInfo.userName}
                        </p>
                    ):(
                        <p className="text-xs text-lightText font-light">
                        Hello, sign in
                        </p>
                    )
                }
                
           
                <p className="hidden md:inline-flex text-sm font-semibold -mt-1 text-whiteText">
                Accounts & Lists{" "}
                <span>
                <ArrowDropDownOutlinedIcon />
                </span>
                </p>
                 </div>
            </Link>

            <Link to="/favorite">
            <div className='flex flex-col items-start justify-center headerHover relative'>
                <p className='text-xs text-lightText font-light'>Favorite</p>
                <p className='text-sm font-semibold -mt-1 text-whiteText'>& Wishlists</p>
                {
                    fav.length >0 && (
                        <span className='absolute right-3 -top-1 w-4 h-4 bg-[#82b7f7] font-semibold flex items-center justify-center text-xs text-amazon_blue'>{fav.length}</span>
                    )
                }
            </div>
            </Link>

            <Link to="/cart">
                <div className='flex items-start justify-center headerHover relative'>
                    <ShoppingCartIcon/>
                    <p className='text-xs font-semibold mt-3 text-whiteText'>
                    Cart <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#82b7f7] text-amazon_blue rounded-full flex justify-center items-center '>
                        {products.length >0 ?products.length:0}
                        </span>
                    </p>
                </div>
            </Link>
            {userInfo && (
                <div onClick={handleLogout}
                className="flex flex-col justify-center items-center headerHover relative"
                >
                <LogoutIcon />
                <p className="inline-flex text-xs font-semibold text-whiteText">
                    Log out
                </p>
            </div>
            )}
        </div>
        <div>
            <HeaderBottom/>
        </div>
        
     

    </div>
  )
}

export default Header
