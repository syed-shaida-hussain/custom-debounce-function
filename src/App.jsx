import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {

  const [products , setProducts] = useState([]);
  const [searchQuery , setSearchQuery] = useState("");
  const [timer , setTimer] = useState("");


  const myDebounce = (cb , delay) => {
    return function (...args) {
      if(timer) clearTimeout(timer)
      setTimer(
        setTimeout(() => {
          cb(...args)
        },delay)
      )
    }
  }

  const fetchData = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    setProducts(res.data.products);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    console.log("API CALLED")
  }

  const debouncedChangeHandler = myDebounce(handleChange , 1000)

  const filterProducts = ( products , query) => {
    if(!query) return products;
    return products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
  }

  const searchedProducts = filterProducts(products , searchQuery)

  useEffect(() => {
    fetchData();
  },[])

  return (
    <>
      <h2>Custom debounce function</h2>
      <input type = "text" onChange = {debouncedChangeHandler} placeholder = "Enter search text here..."/>
      {searchedProducts.map((product,index) => <div key = {index}>
        <h3>{index+1} . Name : {product.title}</h3>
        <h3>Brand : {product.brand}</h3>
        <h3>Price :  {product.price}</h3>
        <hr />
      </div>)}
    </>
  )
}

export default App
