
import { useEffect } from 'react'

import { useState } from 'react'
import Product from '../components/Product';

function Collection() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategoryOption, setFilterCategoryOption] = useState([]);
  const [filterSubCategoryOption,setFilterSubCategoryOption]=useState([]);
  const [search, setSearch] = useState('');
  const [searchResultShowed, setSearchResultShowed] = useState(false);
 
 

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error(error);
      })

  }, [])

//handle category filter
  const handleCategoryFilterInput = (e) => {
    if (filterCategoryOption.includes(e.target.value)) {
      setFilterCategoryOption(filterCategoryOption.filter(item => !item.includes(e.target.value)))
    }
    else {
      const newFilterOption = [...filterCategoryOption, e.target.value]
      setFilterCategoryOption(newFilterOption)
    }
  }

  //handle sub-category filter

  const handleSubCategoryFilterInput=(e)=>{
    console.log(e.target.value);
    if(filterSubCategoryOption.includes(e.target.value)){
     setFilterSubCategoryOption(filterSubCategoryOption.filter(item=>!item.includes(e.target.value)))
    }
    else{
      const newFilterSubOption=[...filterSubCategoryOption,e.target.value];
      setFilterSubCategoryOption(newFilterSubOption);
    }
  }

  //update FilteredProducts

  const updateFilteredproducts = () => {
    if(filterCategoryOption.length>0 && filterSubCategoryOption.length>0){
const matchedBothProduct = products.filter(product => filterCategoryOption.includes(product.category)&&filterSubCategoryOption.includes(product.subCategory));
      setFilteredProducts(matchedBothProduct);
    }
    else  if (filterCategoryOption.length>0) {
      const matchedCategoryProduct = products.filter(product => filterCategoryOption.includes(product.category))
      setFilteredProducts(matchedCategoryProduct);
    }
    else if(filterSubCategoryOption.length>0){
      const matchedSubCategoryProduct = products.filter(product => filterSubCategoryOption.includes(product.subCategory));
      setFilteredProducts(matchedSubCategoryProduct);
    }
 
    else {
      setFilteredProducts(products);
    }
  }

  useEffect(() => {
    updateFilteredproducts();
    console.log(filterCategoryOption,filterSubCategoryOption);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategoryOption,filterSubCategoryOption]);

  useEffect(() => {
    console.log(filteredProducts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFilteredproducts])


//handle search function

  const searchProducts = (e) => {
    e.preventDefault();
    const searchtext = e.target.searchtext.value;
    if (searchtext.length > 0) {
      setSearch(searchtext);
      setFilteredProducts(products.filter(item => item.title.toLowerCase().includes(searchtext.toLowerCase())));
      setSearchResultShowed(true);
    }
  }

  const handleShowResults = () => {
    setFilteredProducts(products);
    setSearchResultShowed(false);
  }

  //handle select option

  const handleSelectOption=(e)=>{
   console.log(e.target.value)
   if(e.target.value==='ascending'){
    const ascending=[...filteredProducts].sort((a,b)=>a.price-b.price);
    setFilteredProducts(ascending);
   }
 else  if(e.target.value==='descending'){
    const descending=[...filteredProducts].sort((a,b)=>b.price-a.price);
    setFilteredProducts(descending);
  }
  else {
    const relevant=[...filteredProducts].sort(() => Math.random() - 0.5);
    setFilteredProducts(relevant);
  }
  }

//handle stock based sorting





  return (
    <div className='border border-green-800'>
<div>
  <div>
  <form onSubmit={searchProducts}>
        <input type='text' placeholder='Enter text to Search!' name='searchtext' />
        <button >Search</button>
      </form>
      {
       searchResultShowed? <div> showing search result for:<hr/> {search} <br/> <button className='text-red-700' onClick={handleShowResults}>  close search result</button></div> :''
      }
  </div>

  <div>
    <select onChange={handleSelectOption}>
      <option value="relevant">Relevant</option>
      <option value="ascending">Price: Low to High</option>
      <option value="descending">Price: High to Low</option>
    </select>
  </div>
</div>
   
      <div>
        <input type="checkbox" onChange={handleCategoryFilterInput} value={"Men"} name="Men" />
        <p>Men</p>
      </div>
      <div>
        <input type="checkbox" onChange={handleCategoryFilterInput} value={"Women"} name="Women" />
        <p>Women</p>
      </div>
      <div>
        <input type="checkbox" onChange={handleCategoryFilterInput} value={"Kids"} name="Kids" />
        <p>Kids</p>
      </div>
<hr/>
      <div>
        <input type="checkbox" onChange={handleSubCategoryFilterInput} value={"Topwear"} name="Topwear" />
        <p>Topwear</p>
      </div>
      <div>
        <input type="checkbox" onChange={handleSubCategoryFilterInput} value={"Footwear"} name="Footwear" />
        <p>Footwear</p>
      </div>
      <div>
        <input type="checkbox" onChange={handleSubCategoryFilterInput} value={"Bottomwear"} name="Bottomwear" />
        <p>Bottomwear</p>
      </div>
      <div>
        <input type="checkbox" onChange={handleSubCategoryFilterInput} value={"Outerwear"} name="Outerwear" />
        <p>Outerwear</p>
      </div>
      {
        // filteredProducts.length>0 &&
       filteredProducts&& filteredProducts.map((item, index) => <Product key={index} item={item}> </Product>)
      }
<hr></hr>

     </div>
  )
}

export default Collection;
