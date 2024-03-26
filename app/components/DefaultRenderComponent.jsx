"use client"
import Image from 'next/image';
import React from 'react';
import { renderTextByProperty } from './mainconsts'
import { easeInOut, motion } from 'framer-motion';
import Link from 'next/link';

const DefaultRenderComponent = ({ sectionData }) => {
    const activeItem = sectionData[0];
    const activeItemProps = Object.keys(activeItem);
    
    return (
        <div className='relative  h-full md:h-auto gap-1 flex flex-col justify-around items-center md:justify-around   md:flex-row md:items-center '>
           <motion.div 
                dragConstraints={{ left: 0, right:0, top: 0, bottom: 0 }}  
                initial={{ opacity: 0, x: -100}}
                animate={{ opacity: 1, x: 0}} 
                transition={{ duration: 0.5, ease: "easeOut" }} 
                className='  mt-10 md:top-0 md:relative flex flex-col gap-[20px] justify-center justify-self-center items-center md:self-center md:justify-self-start text-center md:text-start '>
                {/* Render text data on the left side */}
                <div className='text'>
                    {activeItemProps.map((prop, index) => {
                        if (prop !== 'imageURL') {
                            return (
                                renderTextByProperty(prop, activeItem[prop], index, 'text-center text-white text-[40px] md:text-[70px] welcome')
                            );
                        }
                        return null; // Skip rendering imageURL here
                    })}
                    <div className='flex mt-3 flex-col md:flex-row justify-center items-center gap-1 md:gap-1'>
                    <Link href="#Portfolio" className='w-full text-center md:w-1/3 p-3 bg-[#EFBC9B] rounded-full text-[#FBF3D5] '>
                       
                        <h5>see my portfolio</h5>
                    
                    </Link>
                    <Link href="#mailme" className='w-full text-center   md:w-1/3 p-3 bg-[#EFBC9B] rounded-full text-[#FBF3D5]'>
                        <h5>mail me</h5>
                    </Link>
                    <Link href="https://l.instagram.com/?u=https%3A%2F%2Fanfihandmade.etsy.com%2F&e=AT0D5YKnF6Q5bHxZvIBtQ8do5aHfO_9PG7tpt2TmU-8NBRt9Bf3ZdOIh-ia2RT2-IsdIRbxfVTDyN0UKheP0nVKYWJmeoK69Mer0huS933zXu3CCrnDTCw" target="_blank" className='w-full text-center  md:w-1/3 p-3 bg-[#EFBC9B] rounded-full text-[#FBF3D5] '>
                        <h5>my brooches</h5>
                    </Link>
                    </div>
                </div>
            </motion.div>
            <motion.div  
                transition={{ duration: 0.5, delay: 0.1, ease: easeInOut }} 
                initial={{ opacity: 0, x: 400 }} 
                animate={{ opacity: 1, x: 0 }} 
                className='order-2 relative h-full overflow-hidden flex md:h-screen object-contain justify-self-center justify-center items-center'
                 // Ensure that any overflowing content is hidden
            >
                {/* Render image on the right side */}
                {activeItemProps.includes('imageURL') && (
                    <motion.img 
                        src={activeItem['imageURL']} 
                        className='object-contain h-full' 
                        alt="Image"  // Rotate the image by 90 degrees
                    />
                )}
            </motion.div>

            
        </div>
    );
};

export default DefaultRenderComponent;
