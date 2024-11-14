import { useEffect, useState } from "react";
import Product from "./Product";


const Stock = () => {

  const [products, setProducts] = useState([]);
  const [stockSort,setStockSort]=useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(error => {
        console.error(error);
      })

  }, [])

 


  useEffect(()=>{
    const StockedProduct= products.filter(product=>product.stock>50);
    setStockSort(StockedProduct)},[products])


  return (
    <div>
      <div>Here is items which has higher stock than 50 : </div>
      {
        stockSort&& stockSort.map((item, index) => <Product key={index} item={item}> </Product>)
      }
     </div>

  );
};

export default Stock;