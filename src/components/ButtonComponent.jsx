
"use client"
import React from 'react'

import Link from 'next/link'


const ButtonComponent = ({label ,full = false ,href = "", handleClick = ()=>{}, className = "", type="button"}) => {
//       
  if(href != ""){
    return (
   
      <Link href={href ?? ""}  legacyBehavior>
            <button type={type}  onClick={handleClick}    className={`p-2 px-4  h-[50px] w-full rounded-md ${full ? "bg-blue-500 border-none text-white" : "border-blue-500 border-2 text-blue-500"} ${className}`} >
             {label} </button>
      </Link>
     )
  }else{
    return (
   
      <div className={` h-[45px] w-full  ${className}`}   legacyBehavior>
            <button type={type}  onClick={handleClick} className={`p-2 px-4  h-[50px] w-full rounded-md ${full ? "bg-blue-500 border-none text-white" : "border-blue-500 border-2 text-blue-500"} ${className}`} >
             {label} </button>
      </div>
     )
  }
}

export default ButtonComponent