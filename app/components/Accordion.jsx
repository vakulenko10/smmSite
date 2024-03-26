"use client"
import React, { useState , useRef} from 'react';
import { AnimatePresence, motion , useInView} from 'framer-motion';
import { AiOutlineMinus,  AiOutlinePlus } from "react-icons/ai";
import { useLanguage } from './LanguageContext';
import { renderIntoDocument } from 'react-dom/test-utils';
import { renderTextByProperty } from './mainconsts';
const Accordion = ({ sectionData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const ref = useRef(null)
  const isInView = useInView(ref)
  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
 const {language} = useLanguage();
  return (
    <AnimatePresence>
    <div className=" min-h-full overflow-y-visible max-w-full flex justify-center items-center">
      <motion.div ref={ref} className="absolute py-10 accordion w-[90vw] max-w-3/4 md:w-[900px] max-w-lg rounded-[100px]" initial={{x: -300}} whileInView={{x: 0}} transition={{duration: 1}} >
        {sectionData.map((item, index) => (
          <div className="accordion-item w-full text-wrap bg-[#D6DAC8] my-1 shadow-lg" key={item['imageURL']+`${index}`}>
            <div
              className={`accordion-title break-words  border-t-[1px] border-[#9CAFAA]  box-border overflow-hidden cursor-pointer py-4 px-6 flex justify-between${index === activeIndex ? '' : ''}`}
              onClick={() => onItemClick(index)}
            >
              {Object.keys(item).map((prop, index) => (
                prop.includes('Question')&&
               renderTextByProperty(prop, item[prop], index, `w-3/4 text-wrap overflow-hidden box-border break-words text-lg flex text-[#5c6764] font-semibold ${language=="ua"?'font-Caveat':''}`)
                // prop.includes('Question') && (
                //   <h5 key={item[prop]+ `${index}`} className="w-3/4 text-wrap overflow-hidden box-border break-words text-lg flex text-[#5c6764] font-semibold">{item[prop]}</h5>
                // )
              ))}
              <button className="toggleOpen w-1/8">
                  {index === activeIndex ? <AiOutlineMinus className='fill-[#393939]' />: <AiOutlinePlus className='fill-[#393939]' />}
                </button>
            </div>
            {index === activeIndex && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="accordion-content   py-4 px-6 ]"
              >
                {Object.keys(item).map((prop, index) => (
                  prop.includes('Answer')&&
                  renderTextByProperty(prop, item[prop], index, `text-base `)
                // prop.includes('Answer') && (
                  //   <h3 key={item[prop]+ `${index}`} className="text-base ">{item[prop]}</h3>
                  // )
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
    </AnimatePresence>
  );
};

export default Accordion;
