import { Button, Grid } from "@material-ui/core";
import ShippingForm from "./shippingForm";
import PaymentForm from "./paymentForm";

import { useState, useEffect } from "react";
import { commerce } from '../../lib/commerce';

function Checkout({ cart }) {
    const [checkout, setcheckout] = useState({});

    const [shippingInfo, setshippingInfo] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});
    const [placedOrder, setPlacedOrder] = useState(false);



    useEffect(() => {
        if (cart.id) {
            commerce.checkout.generateToken(cart.id, { "type": "cart" }).then(
                (checkout) => {
                    setcheckout(checkout);                  
                }
            );
        }
    }, [cart]);


    console.log(cart);    
    console.log(checkout);
    console.log(shippingInfo);

    const handlePlaceOrder = (checkout, shippingInfo, paymentMethod) => {
        console.log(checkout);
        console.log(shippingInfo);
        console.log(paymentMethod);
        let splitname = shippingInfo["name"].split(' ');

        const orderData = {
            "line_items": checkout.live.line_items,
            "customer": {
                "email": shippingInfo["email"],
                "firstname": splitname[0],
                "lastname": splitname[1],
                "phone": shippingInfo["phone"],
                },
            "shipping": {
                "name": shippingInfo["name"],
                "street": shippingInfo["street"],
                "town_city": shippingInfo["city"],
                "county_state": shippingInfo["region"],
                "postal_zip_code": shippingInfo["zip"],
                "country": shippingInfo["country"]
            },
            "fulfillment": {
                "shipping_method": shippingInfo["shipping"],
            },
            "payment": {
                "gateway": 'stripe',
                "stripe": {
                "payment_method_id": paymentMethod["id"]
                }
            }    
        };

        console.log(orderData);
        commerce.checkout.capture(checkout.id, orderData).then(
            (response) => {
                console.log(response);
                setPlacedOrder(true);
            }
        )
    }

    if ( !checkout.id) return <h4>Loading ...</h4>
    if (placedOrder) return <h4>Order placed!</h4>
    return (
        <Grid container direction="column">
            <Grid item>
                <header><h3>Check out</h3></header>
            </Grid>

            <Grid item>
                < ShippingForm checkoutToken={checkout.id} setshippingInfo={setshippingInfo} />
            </Grid>

            <Grid item>
                <PaymentForm setPaymentMethod={setPaymentMethod}/>
            </Grid>

            <Grid item>
                <Button 
                    onClick={
                        (event) => {handlePlaceOrder(checkout, shippingInfo, paymentMethod)}}                    
                    disabled = {!shippingInfo.email || !paymentMethod.id}
                    >Place your order</Button>
            </Grid>

        </Grid>
    )
}

export default Checkout;