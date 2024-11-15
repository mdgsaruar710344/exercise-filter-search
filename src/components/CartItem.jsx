import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopProvider";


const CartItem = ({ item }) => {
  const { products, cart, setCart, setCartQuantity,cartQuantity,totalCartPrice,setTotalCartPrice } = useContext(ShopContext)
  const { ID, Size, Quantity } = item;
  const [matchedCartItem, setMatchedCartItem] = useState()
  const [itemTotalPrice, setItemTotalPrice] = useState(0)
   const [inputValue,setInputValue]=useState()


   useEffect(() => {
    // Sync `inputValue` with the Quantity in `cart` when it changes
    setInputValue(Quantity);
  }, [Quantity]);

 useEffect(()=>{
const total=totalCartPrice+itemTotalPrice;
setTotalCartPrice(total);
 },[itemTotalPrice])

  useEffect(()=>{
    console.log('Total Cart price :',totalCartPrice)
  },[totalCartPrice])


  useEffect(() => {

    for (const product of products) {
      const matchingProduct = product.id == ID ? product : '';
      if (matchingProduct) {
        setMatchedCartItem(matchingProduct);
      }
    }

  }, [products, cart])

  // useEffect(() => {
  //   console.log(matchedCartItem)
  //   const totalitemprice = Quantity * matchedCartItem.price;
  //   setItemTotalPrice(totalitemprice);
  // }, [matchedCartItem])

  useEffect(() => {
    if(matchedCartItem){
      const totalitemprice = Quantity * matchedCartItem.price;
      console.log(totalitemprice);
      setItemTotalPrice(totalitemprice);
      
   

    }
  
  }, [cart,matchedCartItem])




  const handleUpdateQuantity = (e) => {
    const newquantity = parseInt(e.target.value);
    console.log(newquantity);
    if(newquantity>0){
      const QuantityUpdatedcart = cart.map(item => item.ID == ID && item.Size == Size ? { ...item, Quantity: newquantity } : item)
      console.log(QuantityUpdatedcart);
  
      setCart(QuantityUpdatedcart);
      setInputValue(newquantity);
    }
 

  }

  const handleDeleteItem=()=>{
    const deleteUpdatedCart=cart.filter(item=> !(item.ID == ID && item.Size == Size));
    console.log(deleteUpdatedCart);
    setCart([...deleteUpdatedCart]);

    if (deleteUpdatedCart.length === 0) {
      setCartQuantity(0); // Explicitly set total quantity to 0
    }
   // setInputValue(Quantity);
  }

  // const handleInputValue=(e)=>{
  //   if(e.target.value===''|| e.target.value<1){
  //       setInputValue(1)
  //   }
  //   else{
  //     setInputValue(e.target.value);
  //   }
  // }

  useEffect(() => {

    
      if (cart.length === 0) {
        setCartQuantity(0); // Reset cart quantity explicitly
        console.log('i have been checked')
      } else {
        const totalQuantity = cart.reduce((sum, item) => sum + item.Quantity, 0);
        setCartQuantity(totalQuantity);
        console.log('shit!  me too')
      }

//     let newTotalvalue = 0;
// console.log('The cart in useeffect is:',cart);
//     for (const item of cart) {
//       newTotalvalue = newTotalvalue + item.Quantity;
//     }
// if(cart.length===0){
// setCartQuantity(0);
// console.log('i have been checked')
// }
// else{
//   setCartQuantity(newTotalvalue);
//   console.log('shit! i me too')
// }
    

  }, [cart])


  useEffect(()=>{
    console.log('cart quantity is:',cartQuantity)
  },[cartQuantity])

  return (
    <div className="m-4 border-red-600 border-2 flex flex-row">
      ID: {ID}
      <br></br>
      Size: {Size}
      <br></br>
      Quantity: {Quantity}
      <br></br>
      {matchedCartItem && <div>
        Title:
        {matchedCartItem.title}
        <br></br>
        <div className="">
          <img className="w-[100px] h-[100px] m-5 object-cover" src={matchedCartItem.photo[0]} />
        </div>
        <div> price: {matchedCartItem.price}</div>
        Update Quantity:
        <input onChange={handleUpdateQuantity}  name="updatedquantity"  value={inputValue} type="number"  min={1} />

       <div>
        <button onClick={handleDeleteItem} className="btn btn-warning">Delete</button>
       </div>
      </div>}

      <div>
        Total Price:
        {itemTotalPrice}

        <br></br>

      </div>
    </div>
  );
};

export default CartItem;