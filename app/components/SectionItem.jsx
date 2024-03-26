"use client"
import Image from 'next/image';
import React from 'react'
const SectionItem = ({ collectionName, item, index }) => {
  return (
    <div className={`flex flex-col`}>
      {Object.keys(item).map((itemProperty, indexProp) => (
        <div key={indexProp* Math.random()}>
          {itemProperty === 'imageURL' ? (
            <Image className={`w-[400px] h-auto`} src={item[itemProperty]} alt={itemProperty} />
          ) : (
            renderTextByProperty(itemProperty, item[itemProperty])
          )}
        </div>
      ))}
    </div>
  );

  // Function to render text based on property
  
};

export default SectionItem;