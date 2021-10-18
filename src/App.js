
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { commerce } from './lib/commerce';
import { useState, useEffect} from "react";
import {Grid, AppBar, Toolbar, Typography, IconButton} from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';

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
    <Grid container direction='column'>
      <Grid item>
        <AppBar position="static">
          <Toolbar>            
            <IconButton href="/">
              <StorefrontIcon />
            </IconButton>  

            <Typography>Shop</Typography>
          </Toolbar>          
        </AppBar>
      </Grid>
      <Grid item container>

        <Grid item xs={false} sm={1} md={2} lg={2}></Grid>

        <Grid item xs={12} sm={10} md={8}>
          { products.length === 0 && <p>Loading...</p>}

          {
            <BrowserRouter>
              <Switch>
                <Route exact path={["/products"]}>
                  <ProductList prods={products} />
                </Route> 
                <Route path={["/products/:productId"]}>
                  <Product />
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
