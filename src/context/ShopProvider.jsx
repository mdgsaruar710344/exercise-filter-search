import { createContext, useEffect, useState } from "react";

export const ShopContext=createContext(null)

const ShopProvider = ({children}) => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setProducts(data);
      })
      .catch(error => {
        console.error(error);
      })

  }, [])

const shopinfo={products}


  return (
   <ShopContext.Provider value={shopinfo}>
      {children}
   </ShopContext.Provider>
  );
};

export default ShopProvider;