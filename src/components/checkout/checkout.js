import { Grid } from "@material-ui/core";
import ShippingForm from "./shippingForm";

import { useState, useEffect } from "react";
import { commerce } from '../../lib/commerce';

function Checkout({ cart }) {
    const [checkoutToken, setcheckoutToken] = useState("");

    const [shippingInfo, setshippingInfo] = useState({});



    useEffect(() => {
        if (cart.id) {
            commerce.checkout.generateToken(cart.id, { "type": "cart" }).then(
                (response) => {
                    console.log(response);
                    setcheckoutToken(response.id);                  
                }
            );
        }
    }, [cart]);


    console.log(cart);    
    console.log(checkoutToken);
    console.log(shippingInfo);


    return (
        <Grid container direction="column">
            <Grid item>
                <header><h3>Check out</h3></header>
            </Grid>

            <Grid item>
                < ShippingForm checkoutToken={checkoutToken} setshippingInfo={setshippingInfo} />
            </Grid>

            <Grid item>
                <h3>Placeholder for Payment information</h3>
            </Grid>

            <Grid item>
                <h3>Placeholder for Submission</h3>
            </Grid>

        </Grid>
    )
}

export default Checkout;