import {Grid} from "@material-ui/core";
import CartItem from "./cartItem";

function Cart({cart}){
    if(!cart || !cart.line_items) {
        return <div>Loading the shopping cart...</div>
    }

    if(cart.total_items === 0) {
        return <div> Your shopping cart is empty. </div>
    }


    return(
        <Grid container direction='column'>
            {
                cart.line_items.map(
                    (cartItem) => {
                        return (
                            <CartItem key={cartItem.id} cartItem={cartItem}/>
 
                        )
                    }
                )
            }

        </Grid>
    );
}

export default Cart;