
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import Product from './Product';

function App() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResultShowed, setSearchResultShowed] = useState(false)

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


  const handlefilterInput = (e) => {
    if (filterOption.includes(e.target.value)) {
      setFilterOption(filterOption.filter(item => !item.includes(e.target.value)))

    }
    else {
      const newFilterOption = [...filterOption, e.target.value]
      setFilterOption(newFilterOption)

    }
  }



  const updateFilteredproducts = () => {
    if (filterOption.length > 0) {
      const matchedProduct = products.filter(product => filterOption.includes(product.category));
      setFilteredProducts(matchedProduct);

    }
    else {
      setFilteredProducts(products);
    }

  }

  useEffect(() => {
    updateFilteredproducts();
    console.log(filterOption);

  }, [filterOption]);

  useEffect(() => {
    console.log(filteredProducts);
  }, [updateFilteredproducts])



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



  return (
    <>

      <form onSubmit={searchProducts}>
        <input type='text' placeholder='Enter text to Search!' name='searchtext' />
        <button >Search</button>
      </form>

      {
       searchResultShowed? <div> showing search result for:<hr/> {search} <br/> <button className='text-red-700' onClick={handleShowResults}>  close search result</button></div> :''
      }


      <div>
        <input type="checkbox" onChange={handlefilterInput} value={"Men"} name="Men" />
        <p>Men</p>
      </div>
      <div>
        <input type="checkbox" onChange={handlefilterInput} value={"Women"} name="Women" />
        <p>Women</p>
      </div>
      <div>
        <input type="checkbox" onChange={handlefilterInput} value={"Kids"} name="Kids" />
        <p>Kids</p>
      </div>
      {
        // filteredProducts.length>0 &&
        filteredProducts.map((item, index) => <Product key={index} item={item}> </Product>)
      }
    </>
  )
}

export default App
