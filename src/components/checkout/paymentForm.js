import {loadStripe} from "@stripe/stripe-js";
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


function PaymentForm({setPaymentMethod}) {
    console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    console.log(stripePromise)

    const handleCardSubmit = (event, stripe, elements) => {
        event.preventDefault();

        console.log(stripe)

        const cardElement = elements.getElement(CardElement);
        stripe.createPaymentMethod({type: "card", card: cardElement}).then(
            ({error, paymentMethod}) => {
                if (error) {
                    console.log(error)
                } else {
                    setPaymentMethod(paymentMethod);
                    console.log(paymentMethod);
                }
            }
        )  
    }

    return (
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {                    
                    ({stripe, elements}) => (
/*                         <form onSubmit={(event) => handleCardSubmit(event, stripe, elements)}>
                            <CardElement />
                            <Button type="submit">Submit card payment</Button>
                        </form>  */  
                        <div>
                            <CardElement />
                            <Button onClick={(event) => handleCardSubmit(event, stripe, elements)}>Submit card information</Button>
                        </div>
                    )                    
                }
            </ElementsConsumer>

        </Elements>
    );

}

export default PaymentForm;