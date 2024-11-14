import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopProvider";


const ProductDetails = () => {
  const [detailedProduct, setDetailedProduct] = useState();
  const [clothSize, setClothSize] = useState('');


  const [gallery, setGallery] = useState();
  const { products, cart, setCart, cartQuantity, setCartQuantity } = useContext(ShopContext);
  const paramInfo = useParams();
  const paramId = parseInt(paramInfo.id);



  useEffect(() => {
        let newTotalvalue = 0;

        for (const item of cart) {
          newTotalvalue = newTotalvalue + item.Quantity;
        }

        setCartQuantity(newTotalvalue);

      }, [cart])

      
  useEffect(() => {
    console.log(cartQuantity);
  }, [cartQuantity])
  

  useEffect(() => {
    const matchedId = products.find(product => product.id === paramId)
    if (matchedId) {
      // console.log(matchedId)
      setDetailedProduct(matchedId);

    }
  }, [products])


  useEffect(() => {
    if (detailedProduct) {
      setGallery(detailedProduct.photo[0])
    }
    // console.log(detailedProduct);
    //console.log(gallery);
  }, [detailedProduct])

  useEffect(() => {
    console.log(clothSize);
  }, [clothSize])


  const handleAddtoCart = () => {
    if (!clothSize) {
      alert('Select sizes to add to cart');
    }
    if (clothSize) {
      console.log(clothSize);
      const exists = cart.some(item => item.ID == detailedProduct.id && item.Size == clothSize);
      console.log(exists);

      const updatedCart = exists ? cart.map(item => item.ID == detailedProduct.id && item.Size == clothSize
        ? { ...item, Quantity: item.Quantity + 1 } : item)
        : [...cart, { ID: detailedProduct.id, Size: clothSize, Quantity: 1 }]
      console.log(updatedCart);
      setCart(updatedCart);

    }
  }


  return detailedProduct ? (

    <div>
      This is product details page:
      Title:
      <br></br>
      {detailedProduct.title}
      <div className="flex">
        <div>
          {detailedProduct.photo.map((singlephoto, index) => <div onClick={() => { setGallery(singlephoto) }} key={index}>  <img src={singlephoto} className="w-40 m-5" /></div>)}
        </div>

        {gallery ? <img src={gallery} className="w-[600px] h-[600px] m-5 object-cover" /> : ''}
      </div>
      <div className="flex gap-5">
        {detailedProduct.sizes.map((size, index) => <div onClick={() => { setClothSize(size) }} className="border-green-900 border-2 text-3xl hover:cursor-pointer " key={index}> {size}</div>)}
      </div>

      Price: {detailedProduct.price}
      <br></br>

      <button onClick={handleAddtoCart} className="btn btn-primary">Add to Cart</button>








    </div>

  ) : <></>
};

export default ProductDetails;