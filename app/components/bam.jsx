"use client"
import React, { useState, useEffect } from 'react';
export const filterDataByLanguage = (data) => {
  const unwantedProps = ["_id", "updatedAt", "createdAt", "__v"];
  
  const filteredData = {
      en: {},
      ua: {}
  };

  for (const collectionName in data) {
      filteredData.en[collectionName] = data[collectionName].map(item => {
          const filteredItem = {};
          for (const key in item) {
              if (!key.startsWith('ua') && !unwantedProps.includes(key)) {
                  filteredItem[key] = item[key];
              }
          }
          return filteredItem;
      });

      filteredData.ua[collectionName] = data[collectionName].map(item => {
          const filteredItem = {};
          for (const key in item) {
              if (!key.startsWith('en') && !unwantedProps.includes(key)) {
                  filteredItem[key] = item[key];
              }
          }
          return filteredItem;
      });
  }
  return filteredData;
};
export function YourComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchContentFromDB'); // Assuming you've set up the API route to fetch data from MongoDB
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const language = 'en';
        const filteredData = filterDataByLanguage(jsonData.data, language);
        setData(filteredData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Assuming your data is an object where keys are collection names
  return (
    <div>
      {Object.keys(data).map(collectionName => (
        <div key={collectionName}>
          <h2>{collectionName}</h2>
          <ul>
            {data[collectionName].map(item => (
              <li key={item._id}> {/* Assuming _id is a unique identifier */}
                {JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
