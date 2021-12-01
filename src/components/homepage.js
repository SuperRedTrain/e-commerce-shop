import { useParams } from "react-router";
import { commerce } from '../lib/commerce';
import { useState,useEffect } from "react";

function Homepage(){

    const { userId } = useParams();
    console.log(userId)

    const [customeremail, setCustomerEmail] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    // commerce.customer.getToken(userId).then((jwt) => console.log(jwt));


    useEffect(() => {
        commerce.customer.getToken(userId).then(
            (jwt) => {
                console.log(jwt);
                setIsLogin(true);
            }
            );

    },[userId]);    

    
    useEffect(() => {
        if(isLogin){commerce.customer.about().then(
            (customer) => {console.log(customer);            
                setCustomerEmail(customer.email);             
            }
        );}

    }, [isLogin])



    return (
        <div>
            <h2>Homepage</h2>

            <h3>Welcome, {customeremail}!</h3>

        </div>
        
    )

}
export default Homepage;