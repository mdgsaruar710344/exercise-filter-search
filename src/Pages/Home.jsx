import { useContext } from "react";
import Stock from "../components/Stock";
import { ShopContext } from "../context/ShopProvider";


const Home = () => {
  // const shopinfo=useContext(ShopContext);
  // console.log(shopinfo);
  return (
    <div>
      This is Home
      <hr></hr>
     
      Stock list:
      <br></br>
      <Stock></Stock>
    </div>
  );
};

export default Home;