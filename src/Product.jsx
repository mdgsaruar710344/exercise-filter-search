

const Product = ({item}) => {
  const {id,title,photo,price,description}=item;

  return (
    <div>
     Title: {title}
     
    </div>
  );
};

export default Product;