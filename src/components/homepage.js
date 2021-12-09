import { useParams } from "react-router";
import { commerce } from '../lib/commerce';
import { useState,useEffect } from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    head: {
        backgroundColor: "lightgrey",        
    },
    items: {
        backgroundColor: 'white',
    },

});

function OrderItem({order}){
    const classes = useStyles();
    let date;
    date = new Date(order.created*1000);
/*     console.log((date.getMonth()+1)+
                 "/"+ date.getDate()+
                 "/"+ date.getFullYear()) */

    return (
        <Grid item container direction='column' >
            <Grid item className={classes.head} >
                <h3>Order placed: {(date.getMonth()+1)+
                    "/"+ date.getDate()+
                    "/"+ date.getFullYear()}</h3>
                <div>{order.order_value.formatted_with_code}</div>    
            </Grid>


            <Grid item container direction='column' className={classes.items} >
                 {order.order.line_items.map(
                    (item) => {
                        return ( 
                            <Grid item container key={item.id} style={{alignItems: "center"}} >
                                <Grid item sm={10} md={8}>
                                    {item.product_name}
                                </Grid>
                                   
                                <Grid item sm={1} md={2}>
                                    {item.quantity}
                                </Grid>

                                <Grid item sm={1} md={2}>
                                    {item.line_total.formatted_with_code}
                                </Grid>

                            </Grid>
                        )
                    }
                )} 
            </Grid>

            {/* <Grid item spacing={2}></Grid> */}
            
        </Grid>
    ) 

}

function Homepage(){

    const { userId } = useParams();
    console.log(userId)
   
    

    const [customeremail, setCustomerEmail] = useState("");
    // const [isLogin, setIsLogin] = useState(false);
    const [orders, setOrders] = useState(null);
    const [customerId, setCustomerId] = useState("");
    // commerce.customer.getToken(userId).then((jwt) => console.log(jwt));




    useEffect(() => {
        if(!commerce.customer.isLoggedIn()){
            commerce.customer.getToken(userId).then(
            (jwt) => {
                console.log(jwt);
                setCustomerId(jwt.customer_id);
                // setIsLogin(true);
            }
            );}

    },[userId]);    

    useEffect(() => {
        if(commerce.customer.isLoggedIn()){
            commerce.customer.about().then(
            (customer) => {console.log(customer);            
                setCustomerEmail(customer.email);             
            }
        );}

    }, [commerce.customer.isLoggedIn()]); 

    
   // console.log(customeremail)
    // console.log(customerId)

    useEffect(() => {
        if(commerce.customer.isLoggedIn()){
            commerce.customer.getOrders(customerId).then(
            (orders) => {console.log(orders);            
                setOrders(orders.data);             
            }
        );}

    }, [customerId])



    if(!commerce.customer.isLoggedIn()){
        return <h3>No order history! Please Login first!</h3>
    } 

    if(!orders){
        return <h3>Loading...</h3>
    } else {
        console.log(orders)
        console.log(orders[0].id)
        console.log(orders[0].order_value.formatted_with_code)
    } 




    return (
        
        <Grid container spacing={2}>
            
            <Grid item container>
               {customeremail && <h3> Welcome, {customeremail}! </h3>}
            </Grid>

            <Grid item container direction='column'>                          
                {orders && 
                    orders.map((order) => {
                        return <OrderItem key={order.id} order={order}/>
                    })                                           
                }   
            </Grid>


        </Grid>
        
    )

}
export default Homepage;