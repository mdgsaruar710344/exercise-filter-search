import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopProvider";


const ProductDetails = () => {
  const [detailedProduct,setDetailedProduct]=useState()
  const {products}=useContext(ShopContext);
  const paramInfo=useParams();
  const paramId=parseInt(paramInfo.id);
 // console.log(typeof paramId);

  useEffect(()=>{
    const matchedId= products.find(product=>product.id===paramId)
    if(matchedId){
        console.log(matchedId)
       setDetailedProduct(matchedId);
    }
  },[products])


  // useEffect(()=>{
  //   console.log(detailedProduct);
  // },[products])


  return detailedProduct?  (
    
    <div>
      This is product details page:
      Title:
      <br></br>
      {detailedProduct.title}
      <img src={detailedProduct.photo} className="w-40"/>
      Price: {detailedProduct.price}
      <br></br>
      <button className="btn">Add to Cart</button>








    </div>
   
  ) :  <></>
};

export default ProductDetails;