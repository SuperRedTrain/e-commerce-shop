
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { commerce } from './lib/commerce';
import { useState, useEffect} from "react";
import ProductList from './components/products/products';
import Product from './components/products/product';


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {commerce.products.list().then( result => {
    console.log(result.data);
    setProducts(result.data);
    });
  }, []);




  return (
    <div>
      <header>
        <h1>Little Kids Shop</h1>
      </header>
      <main>
        { products.length === 0 && <p>Loading...</p>}



        <BrowserRouter>
          <Switch>
            <Route exact path={["/"]}>
              <ProductList prods={products} />
            </Route> 
            <Route path={["/:productId"]}>
              <Product />
            </Route> 
          </Switch>
        </BrowserRouter>
        
      </main>
    </div>
  );
}

export default App;
