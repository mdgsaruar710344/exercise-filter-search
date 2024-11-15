import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopProvider";


const CartItem = ({ item }) => {
  const { products, cart, setCart, setCartQuantity } = useContext(ShopContext)
  const { ID, Size, Quantity } = item;
  const [matchedCartItem, setMatchedCartItem] = useState()
  const [itemTotalPrice, setItemTotalPrice] = useState(0)
  const [inputValue,setInputValue]=useState()


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
    }
 

  }

  const handleDeleteItem=()=>{
    const deleteUpdatedCart=cart.filter(item=> !(item.ID == ID && item.Size == Size));
    console.log(deleteUpdatedCart);
    setCart(deleteUpdatedCart);
  }

  const handleInputValue=(e)=>{
    if(e.target.value===''|| e.target.value<1){
        setInputValue(1)
    }
    else{
      setInputValue(e.target.value);
    }
  }

  useEffect(() => {
    let newTotalvalue = 0;

    for (const item of cart) {
      newTotalvalue = newTotalvalue + item.Quantity;
    }

    setCartQuantity(newTotalvalue);

  }, [cart,handleDeleteItem])

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
        <input onChange={handleUpdateQuantity} onInput={handleInputValue} value={inputValue} name="updatedquantity" type="number" defaultValue={Quantity} min={1} />

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