import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopProvider";
import CartItem from "../components/CartItem";


const Cart = () => {
  const { cart, cartQuantity } = useContext(ShopContext)

  const [showCart, setShowCart] = useState([])

  useEffect(() => {
    console.log('Quantity in Navbar is:', cartQuantity)
  }, [cartQuantity])

  return (
    <div>
      This cart page!
      <br></br>
      Total Items: {cartQuantity}
      <hr></hr>
      <div className="flex flex-row ">
        <div className="m-4 w-3/2 border-red-600">
          {cart && cart.map((item, index) => <CartItem key={index} item={item}></CartItem>)}
        </div>
        <div className="text-3xl">
          Hello
        </div>
      </div>


    </div>
  );
};

export default Cart;