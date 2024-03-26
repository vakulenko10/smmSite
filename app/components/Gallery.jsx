import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';

const Gallery = ({ sectionData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPortfolioItemOpened, setIsPortfolioItemOpened] = useState(false);
  const [isPortfolioOpened, setIsPortfolioOpened] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  const handleItemClick = (item) => {
    setIsPortfolioItemOpened(true);
    setSelectedItem(item);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsPortfolioItemOpened(false);
    setSelectedItem(null);
  };

  // useEffect(() => {
  //   console.log("is in view:", isInView)
  // }, [isInView]);

  const handlePortfolioOpened = () => {
    setIsPortfolioOpened(true);
  };

  const handlePortfolioClose = () => {
    // console.log("close")
    setIsPortfolioItemOpened(false);
    setIsPortfolioOpened(false);
  };

  return (
    <motion.div className='relative py-[10px] flex flex-col justify-center items-center gap-[10px] md:grid-rows-2 h-full place-items-center' ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.div  className={` ${isPortfolioOpened ? 'grid grid-cols-2 md:grid-cols-3 pt-3 px-5 gap-3 w-screen overflow-x-hidden h-screen absolute top-0 overflow-y-visible bg-[#00000080] ' : ' hover:scale-110 transform  w-3/4 md:w-1/2 h-1/2 rounded-lg p-3 text-center transition  shadow-[0px_0px_70px_#FBF3D5] hover:shadow-[0px_0px_100px_#FBF3D5] bg-[#9CAFAA] flex justify-center items-center hover:'}`} onClick={handlePortfolioOpened}>{isPortfolioOpened?null:<h5 className='text-white md:text-[3em]'>click to see my portfolio</h5>}
        {sectionData.map((sectionItem, index) => (
          <motion.div
            key={index}
            className={`${isPortfolioOpened ? 'block' : 'hidden'} ${isPortfolioItemOpened?'hidden':''} item w-full h-[200px] object-cover object-center overflow-hidden md:w-full md:h-64 bg-gray-200  rounded-lg relative`}
            onClick={() => handleItemClick(sectionItem)}
          >
            <motion.img
            whileHover={{ scale: 1.1 }} key={index*index} transition={{duration: 0.2}}
              className='object-cover h-full w-full item-hover:scale-50 rounded-lg'
              src={sectionItem['imageURL']}
              alt={index}
            />
          </motion.div>
        ))}
        {selectedItem && (
          <motion.div
            key={`${selectedItem['imageURL']}`}
            className={`${isPortfolioItemOpened ? 'absolute top-0 p-3 left-0 overflow-hidden h-full w-screen z-10 bg-[#9CAFAA]' : 'hidden'}`}
          >
            <div key={`${selectedItem['imageURL']}-div`} className='PortfolioItemInfo flex items-center justify-between box-border overflow-y-visible text-wrap h-full rounded-md'>
              <img src={selectedItem['imageURL']} alt='selected-item' className={` ${isPortfolioItemOpened ?'object-contain ':'object-cover'} w-1/2   rounded-md mb-4`}/>
              {Object.keys(selectedItem).map((prop, index) => {
                if (prop !== 'imageURL') {
                  return <div key={index-1} className='break-words w-1/3 justify-self-start'>{renderTextByProperty(prop, selectedItem[prop], index, 'text-white ')}</div>;
                }
                return null;
              })}
              <button className='absolute top-0 right-0 mt-2 mr-2 bg-gray-800 text-white py-1 px-2 rounded-md z-50' onClick={handleClose}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
      {isPortfolioOpened && (
        <button className="absolute top-0 right-0 mt-2 mr-2 bg-gray-800 text-white py-1 px-2 rounded-md" onClick={handlePortfolioClose}>
          Close portfolio
        </button>
      )}
    </motion.div>
  );
};

export default Gallery;
