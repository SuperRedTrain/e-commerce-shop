import {AppBar, Toolbar, Typography, IconButton, Badge} from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import { Button } from "@material-ui/core";

function Navbar({cartItems}){
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
            <Button href="/login">
                Login
            </Button> 
         
        </Toolbar>          
        </AppBar>
    );
}

export default Navbar;