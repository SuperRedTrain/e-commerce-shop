
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { commerce } from './lib/commerce';
import { useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
// import StorefrontIcon from '@material-ui/icons/Storefront';

import ProductList from './components/products/products';
import Product from './components/products/product';
import Navbar from './components/navbar';
import Cart from './components/cart/cart';
import Checkout from './components/checkout/checkout';
import Login from './components/login';
import Homepage from './components/homepage';





function App() {
  const [cart, setCart] = useState({});
  useEffect(() => {
    commerce.cart.retrieve().then(
      (response) => {
        console.log(response);
        setCart(response)
      }
    );
  }, []);

  const handleAddToCart = (productId, quantity) => {
/*     console.log("this is cart...")
    console.log(cart) */
    commerce.cart.add(productId, quantity).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    )

  }

  const emptyCart = () => {
    commerce.cart.empty().then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    )

  }

  const updateQuantity = (itemId, quantity) => {
    commerce.cart.update(itemId, {quantity: quantity}).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    )

  }

  const removeItem = (itemId) => {
    commerce.cart.remove(itemId).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    )
  }



  const [products, setProducts] = useState([]);
  useEffect(() => {commerce.products.list().then( result => {
    console.log(result.data);
    setProducts(result.data);
    });
  }, []);


 
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <header>< Navbar cartItems={cart.total_items} /></header>
      </Grid>
      <Grid item container>

        <Grid item xs={false} sm={1} md={2} lg={2}></Grid>

        <Grid item xs={12} sm={10} md={8}>
          {/* { products.length === 0 && <p>Loading...</p>} */}

          {
            <BrowserRouter>
              <Switch>
                <Route exact path={["/"]}>
                  <ProductList prods={products} />
                </Route> 
                <Route exact path={["/user/:userId"]}>
                  <Homepage />
                </Route> 
                <Route exact path={["/products/:productId"]}>
                  <Product handleAddToCart={handleAddToCart}/>
                </Route> 
                <Route exact path={["/cart"]}>
                  <Cart cart={cart} emptyCart={emptyCart} 
                    updateQuantity={updateQuantity} removeItem={removeItem} />
                </Route> 
                <Route exact path="/checkout">
                  <Checkout cart={cart} />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
            </BrowserRouter>
          }
        </Grid>

        <Grid item xs={false} sm={1} md={2}></Grid>
      
      </Grid>
    
    </Grid>
  );
}

export default App;
