"use client"
import React from 'react'
import { Sections } from './mainconsts'
import Link from 'next/link'

const LinksContainer = ({isSmallHeaderActive, setIsSmallHeaderActive}) => {
    const handleLinkClick = () =>{
        
         setIsSmallHeaderActive(false)
        
       
    }
    // console.log("Sections:", Sections)
  return (
    <div className={`md:block ${isSmallHeaderActive?`md:relative fixed inset-x-0 inset-y-0 pt-10 p-3 bg-[#000000b9]  h-screen md:h-auto md:block md:bg-inherit md:p-0`:`hidden`} `}>
        <ul className={`md:bg-transparent ${isSmallHeaderActive?`flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent `:`md:flex md:gap-[10px]`} `}>

            {Sections.map((link, index)=> <Link key={index * Math.random()} onClick={handleLinkClick} href={`#${link}`} className={`transition duration-200 ease-linear ${isSmallHeaderActive?`md:bg-transparent p-5 hover:bg-[#fafafa9e] md:hover:bg-transparent md:hover:text-[#ffffffec] md:p-0 `:`md:hover:text-[#ffffff80]`}`}>{link}</Link>)}
           
        </ul>
    </div>
  )
}

export default LinksContainer