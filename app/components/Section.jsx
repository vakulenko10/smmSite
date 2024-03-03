"use client"
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import Container from './Container';
import DefaultRenderComponent from './DefaultRenderComponent';
import Carousel from './Carousel';
import Gallery from './Gallery';
import Accordion from './Accordion';
import { SectionToRenderType, collectionsToSections, sectionClasses } from './mainconsts';
import Loader from './Loader'
const filterDataByLanguage = (collectionData, language) => {
  const unwantedProps = ["_id", "updatedAt", "createdAt", "__v"];

  return collectionData.map(item => {
    var filteredItems = {};
    for (const key in item) {
      if ((!key.startsWith('ua') && language === 'en') || (!key.startsWith('en') && language === 'ua')) {
        if (!unwantedProps.includes(key)) {
          filteredItems[key] = item[key];
        }
      }
    }
    console.log("filteredItems: ",filteredItems)
    return filteredItems;
  });
};



const Section = ({ collectionName, renderType, className }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/fetchContentFromDB/${collectionName}`);
        console.log("response: ", response)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json(); 
        console.log("jsonData: ",jsonData)
        const filteredData = filterDataByLanguage(jsonData.documents, language);
        setData(filteredData);
        setLoading(false)
        
      } catch (error) {
        setError(error.message);
      }
    }
  
    fetchData();
  }, [language, collectionName]);
  const RenderTypeToComponent = (renderType, data) => {
    if (!data || !data.length) {
      return null; // Return null if sectionData is empty or null
    }
  
      switch (renderType) {
        case "default":
          return <DefaultRenderComponent sectionData={data} />;
        case "carousel":
          return <Carousel sectionData={data} />;
        case "gallery":
          return <Gallery sectionData={data} />;
        case "accordion":
          return <Accordion sectionData={data} />;
        default:
          return null;
      }
    
  };
  console.log("data:", data)
  if(loading){
    return(
      <div id={collectionsToSections[collectionName]} className={`${collectionsToSections[collectionName]} section w-full h-[100vh] overflow-hidden box-border ${className} ${sectionClasses[collectionName]}`}>
        <Container classes={`flex justify-center items-center`}>
        <Loader />
        </Container>
      </div>
    )
  }
  else{
    return (
    <div id={collectionsToSections[collectionName]} className={`${collectionsToSections[collectionName]} section w-full h-[100vh] overflow-hidden box-border ${className} ${sectionClasses[collectionName]}`}>
      <Container>
        {/* {JSON.stringify(data)} */}
        {RenderTypeToComponent(renderType, data)}
      </Container>
    </div>
  );}
};

export default Section;
