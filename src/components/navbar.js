import {AppBar, Toolbar, Typography, IconButton, Badge} from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Button } from "@material-ui/core";
import { commerce } from '../lib/commerce';





function Navbar({cartItems}){
    console.log(commerce.customer.isLoggedIn());
    

/*     const handleLogout = () => {
        commerce.customer.logout();
    } */

    
    return (
        <AppBar position="static" color="inherit">
        <Toolbar>            
            <IconButton href="/">
                <StorefrontIcon />
            </IconButton>  
            <Typography>Shop</Typography>
            <IconButton href="/cart"> 
                <Badge badgeContent={cartItems} color="secondary">
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton> 

            <Button href={"/login/user/orders"}>
                ORDERS
            </Button>  

            <IconButton href="/profile">
                <AccountCircleIcon />
            </IconButton>  


            { commerce.customer.isLoggedIn() ? (
                <Button href="/" 
                onClick={() => commerce.customer.logout()}
                 >
                    LOGOUT
                </Button>
            ) : (
                <Button href="/login">
                    LOGIN
                </Button> 
            )}


         
        </Toolbar>          
        </AppBar>


    );
}

export default Navbar;