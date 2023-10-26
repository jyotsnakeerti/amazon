import React, { useState } from 'react'
import Slider from "react-slick";
import { bannerImgFive, bannerImgFour, bannerImgOne, bannerImgThree, bannerImgTwo } from '../../assests';


function Banner1() {
    const [dotActive, setDotActive] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        beforeChange: (prev, next)=>{
            setDotActive(next);
        },
        appendDots: dots => (
            <div
              style={{
                position:"absolute",
                top:"70%",
                left:"0",
                right:"0",
                margin:"0 auto",
                tranform:"translate(-50% -50%)",
                width:"210px",
              }}
            >
              <ul style={{  
                width:"100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
              }}> {dots} </ul>
            </div>
          ),
          customPaging: i => (
            <div
              style={
                i === dotActive
                ? {
                    width: "30px",
                    height:"30px",
                    borderRadius:"50%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    background:"#131921",
                    color: "white",
                    padding:"8px 0",
                    cursor:"pointer",
                    border: "1px solid #f3a847"
                }
                :{
                    width: "30px",
                    height:"30px",
                    borderRadius:"50%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    background:"#232f3e",
                    color:"white",
                    padding:"8px 0",
                    cursor:"pointer",
                    border:"1px solid white",
                }
              }
            >
              {i + 1}
            </div>
          )
      };
  return (
    <div className='w-full '>
        <div className='w-full h-full relative'>
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt='bannerImgOne'></img>
          </div>
          <div>
            <img src={bannerImgTwo} alt='bannerImgTwo'></img>
          </div>
          <div>
            <img src={bannerImgThree} alt='bannerImgThree'></img>
          </div>
          <div>
            <img src={bannerImgFour} alt='bannerImgFour'></img>
          </div>
          <div>
            <img src={bannerImgFive} alt='bannerImgFive'></img>
          </div>
        </Slider>
        </div>
    </div>
  )
}

export default Banner1
