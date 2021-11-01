import {Grid} from "@material-ui/core";
import CartItem from "./cartItem";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';




function Cart({cart, emptyCart, updateQuantity, removeItem}){


    if(!cart || !cart.line_items) {
        return <div>Loading the shopping cart...</div>
    }

    if(cart.total_items === 0) {
        return <div> Your shopping cart is empty. </div>
    }





    return(
        <Grid container>
            <Grid item container direction='column'>
                {
                    cart.line_items.map(
                        (cartItem) => {
                            return (
                                <CartItem key={cartItem.id} cartItem={cartItem}
                                    updateQuantity={updateQuantity} removeItem={removeItem}/>
    
                            )
                        }
                    )
                }

            </Grid>

            <Grid item container>

                <Grid item xs={false} sm={2} md={4}></Grid>

                <Grid item>
                    <Button onClick={
                            () => {
                                emptyCart();
                            }
                        }> EMPTY YOUR CART </Button>
                </Grid>

                <Grid item>
                    <Button component={Link} to="/checkout" 
                    
                        >     
                        Proceed to Checkout 
                    </Button>
                </Grid>

            </Grid>

        </Grid>
    );
}

export default Cart;