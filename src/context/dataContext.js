import React, { useState, useEffect, createContext } from "react";
export const DataContext = createContext();
export default function DataContextProvider({ children }) {
  const server = "https://hiring-test.stag.tekoapis.net/api";
  const [originalProductList, setOriginalProductList] = useState([]);

  const [colorList, setColorList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${server}/products`)
      .then((res) => res.json())
      .then((data) => {
        setOriginalProductList(data);
      });
    fetch(`${server}/colors`)
      .then((res) => res.json())
      .then((colors) => {
        setColorList(colors);
        setLoading(false);
      });
  }, []);

  const DataContextData = {
    originalProductList,
    colorList,
  };
  return (
    <DataContext.Provider value={DataContextData}>
      {!loading && children}
    </DataContext.Provider>
  );
}
