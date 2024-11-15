import { createContext, useEffect, useState } from "react";

export const ShopContext=createContext(null)

const ShopProvider = ({children}) => {

  const [products, setProducts] = useState([]);
  const [cart,setCart]=useState([]);
  const [cartQuantity,setCartQuantity]=useState(0);
  const [totalCartPrice,setTotalCartPrice]=useState(0)


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
  useEffect(()=>{
    console.log(cart);
  },[cart])

const shopinfo={products,cart,setCart,cartQuantity,setCartQuantity,totalCartPrice,setTotalCartPrice}


  return (
   <ShopContext.Provider value={shopinfo}>
      {children}
   </ShopContext.Provider>
  );
};

export default ShopProvider;