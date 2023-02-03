import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'



const initialState = {

  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}
const url=`https://fsdassignment2.vercel.app/items`
const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);



  const fetchProducts = async (url) => {
    dispatch({ type: "GET_PRODUCTS_BEGIN" })
    
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products })
    } catch (error) {
      dispatch({ type: "GET_PRODUCTS_ERROR" });
    }
  }

  const fetchSingleProduct = async (url) => {
    dispatch({ type: "GET_SINGLE_PRODUCT_BEGIN" });

    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "GET_SINGLE_PRODUCT_ERROR" });
    }
  }

  useEffect(() => {
    fetchProducts(url);
  }, [])

  return (
    <ProductsContext.Provider value={{...state, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
