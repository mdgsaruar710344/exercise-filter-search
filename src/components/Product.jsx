import { useNavigate } from "react-router-dom";


const Product = ({item}) => {
  const {id,title,photo,price,description}=item;
  const navigate=useNavigate()

  return (
    <div className="hover:cursor-pointer m-10 border border-red-800 p-4" onClick={()=>{navigate(`/product/${id}`)}} >
     Title: {title}
     <img className="w-40" src={photo[0]}/>
     Price: {price}
     
    </div>
  );
};

export default Product;