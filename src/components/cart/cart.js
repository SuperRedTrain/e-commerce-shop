import {Grid} from "@material-ui/core";
import CartItem from "./cartItem";
import { Button } from "@material-ui/core";



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

            <Grid item container direction='column'>

                <Grid item xs={false} sm={1} md={2} lg={2}></Grid>

                <Grid item>
                    <Button onClick={
                            () => {
                                emptyCart();
                            }
                        }> EMPTY YOUR CART </Button>
                </Grid>

            </Grid>

        </Grid>
    );
}

export default Cart;