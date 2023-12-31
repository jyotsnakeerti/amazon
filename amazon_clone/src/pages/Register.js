import React, { useState } from 'react'
import { darkLogo } from '../assests'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// npm install react-loader-spinner --save
import { RotatingLines} from "react-loader-spinner"
import { motion} from "framer-motion"

function Register() {

  const navigate = useNavigate();

  const auth= getAuth();

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error Message start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  // Loading State start
  const [loading,setLoading] = useState(false);
  const [ successMsg,setSuccessMsg] = useState("")

  // Handle funtion start
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };

  // Email validation start
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // Submit button start
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setFirebaseErr("")
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm your password");
    } else {
      if (cPassword !== password) {
        setErrCPassword("Password not matched");
      }
    }

    if (
        clientName &&
        email &&
        emailValidation(email) &&
        password &&
        password.length >= 6 &&
        cPassword &&
        cPassword === password
      ) {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential)=>{
            updateProfile(auth.currentUser,{
              displayName:clientName,
            })
            const user = userCredential.user;
            console.log(user)
            setLoading(false)
            setSuccessMsg("Account created successfully!");
            setTimeout(()=>{
              navigate("/signin")
            },3000)
          })
          .catch((error)=>{
            const errorCode= error.code;
            if(errorCode.includes("auth/email-already-in-use")){
              setFirebaseErr("Email already in use, try another one")
            }
          })
        // =========== Firebase Registration End here ===============
        setClientName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        setErrCPassword("");
        setFirebaseErr("");
    }
  }

  return (
    <div className='w-full '>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[350px] mx-auto flex flex-col items-center'>
            <img className='w-32' src={darkLogo} alt="darklogo"></img>
            <div className='w-full border border-zinc-200 p-6'>
                <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Your Name</p>
                        <input 
                            onChange={handleName}
                            value={clientName}
                            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                            type='text'/>
                        {
                            errClientName && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>!</span>{errClientName}
                                </p>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Email or Mobile Phone Number</p>
                        <input 
                            onChange={handleEmail}
                            value={email}
                            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                            type='email'/>
                        {errEmail && (
                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                <span className="italic font-titleFont font-extrabold text-base">
                                    !
                                </span>
                                {errEmail}
                            </p>
                        )}
                        {firebaseErr && (
                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                <span className="italic font-titleFont font-extrabold text-base">
                                    !
                                </span>
                                {firebaseErr}
                            </p>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Password</p>
                        <input 
                            onChange={handlePassword}
                            value={password}
                            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                            type='password'/>
                        {errPassword && (
                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                <span className="italic font-titleFont font-extrabold text-base">
                                    !
                                </span>
                                {errPassword}
                            </p>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Re-enter Password</p>
                        <input 
                            onChange={handleCPassword}
                            value={cPassword}
                            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                            type='password'/>
                        {errCPassword && (
                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                <span className="italic font-titleFont font-extrabold text-base">
                                    !
                                </span>
                                {errCPassword}
                            </p>
                        )}
                        <p className='text-xs text-gray-600'>Passwords must be at least 6 Characters</p>
                    </div>
                    <button onClick={handleRegistration} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#a3aef8] to-[#716cfa] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
                        Continue
                    </button>
                    {
                      loading && (<div className='flex justify-center'>
                        <RotatingLines
                          strokeColor="#febd69"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="50"
                          visible={true}
                        />
                      </div>)
                    }
                    {
                      successMsg && (
                        <div>
                          <motion.p 
                            initial={{y:10,opacity:0}}
                            animate={{y:0,opacity:1}}
                            transition={{duration:0.5}}
                            className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'
                          >{successMsg}</motion.p>
                        </div>
                      )
                    }
                </div>
                <p className='text-xs text-black leading-4 mt-4'>By Creating an account, You agree to E-cart 
                    <span className='text-blue-600'> Conditions of Use</span> and 
                    <span className='text-blue-600'> Privacy Notice.</span>
                </p>
                <div>
                    <p className='text-xs text-black mt-4'>Already have an account? {"  "}
                        <Link to="/signin">
                            <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                            Sign In{" "}
                            <span><ArrowRightOutlinedIcon/></span>
                            </span>
                        </Link>
                    </p>
                    <p className='text-xs text-black -mt-1.5'>Buying for Work?{" "}
                        <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                            Create a free business account
                        </span>
                    </p>
                </div>
            </div>
        </form>
      </div>
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions Of Use</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Help</p>
        </div>
        <p className='text-xs text-gray-600'>© 2023, Ecart.com, Inc. or its affiliates</p>
      </div>
    </div>
  )
}

export default Register
