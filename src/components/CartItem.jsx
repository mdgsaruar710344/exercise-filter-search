import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopProvider";


const CartItem = ({item}) => {
 const {products,cart,setCart,setCartQuantity}= useContext(ShopContext)
  const {ID,Size,Quantity}=item;
  const [matchedCartItem,setMatchedCartItem]=useState()
  const [itemTotalPrice,setItemTotalPrice]=useState(0)
  

useEffect(()=>{

  for(const product of products ){
    const matchingProduct= product.id==ID ? product : '';
       if(matchingProduct){
        setMatchedCartItem(matchingProduct);
       }
    }
 
  },[products,cart])

  useEffect(()=>{
    console.log(matchedCartItem)
    const totalitemprice=Quantity*matchedCartItem.price;
    setItemTotalPrice(totalitemprice);
  },[matchedCartItem])


  
  


  const handleUpdateQuantity=(e)=>{
    const newquantity= parseInt(e.target.value);
    console.log(newquantity);
   const QuantityUpdatedcart= cart.map(item=> item.ID==ID && item.Size==Size ? {...item, Quantity:newquantity} :item)
   console.log(QuantityUpdatedcart);
   setCart(QuantityUpdatedcart);
   const totalitemprice=Quantity*matchedCartItem.price;
   console.log(totalitemprice);
  setItemTotalPrice(totalitemprice);
  }

  useEffect(() => {
    let newTotalvalue = 0;

    for (const item of cart) {
      newTotalvalue = newTotalvalue + item.Quantity;
    }

    setCartQuantity(newTotalvalue);

  }, [cart])

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
         <img className="w-[100px] h-[100px] m-5 object-cover" src={matchedCartItem.photo[0]}/> 
         </div>
         Update Quantity: 
         <input onChange={handleUpdateQuantity} name="updatedquantity" type="number" defaultValue={Quantity} min={1} />
                 
         </div> }

         <div>
          Total Price:
          {itemTotalPrice}
          <br></br>

         </div>
    </div>
  );
};

export default CartItem;