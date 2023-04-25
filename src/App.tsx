import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Api from './api/api'

function App() {
  const [ products, setProducts ] = useState<any[]>([]); 
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const makeApiCall = async() => {
    setIsLoading(true)
    try{
      const response = await Api.get('/products')
      setProducts(response?.data)
    }
    catch(err){
      console.error(err)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    makeApiCall()
  },[])

  return (
    <div className="App">
      {
        isLoading && <h1>I'm fetching data</h1>
      }
      {
        !isLoading
          &&
        products?.length > 0
          ?
          products.map((product) => {
              return(
                <div key={product?.id}>
                  <div style={{ maxWidth: '400px' }}><img style={{ width: '100%' }} src={product?.image} alt=""/></div>
                  <h4>{product.category}</h4>
                  <h4>{product?.description}</h4>
                </div>
              ) 
          })
          :
          <h4>No products to display </h4>
      }
    </div>
  )
}

export default App
