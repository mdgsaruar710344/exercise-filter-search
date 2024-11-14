import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopProvider";
import CartItem from "../components/CartItem";


const Cart = () => {
 const {cart,cartQuantity}= useContext(ShopContext)

 const [showCart, setShowCart]=useState([])

  return (
    <div>
      This cart page!
      <br></br>
      Total Items: {cartQuantity}
      <hr></hr>
      <div className="m-4 border-red-600">
      {cart&& cart.map((item,index)=>  <CartItem key={index} item={item}></CartItem> )}
      </div>
      
    </div>
  );
};

export default Cart;