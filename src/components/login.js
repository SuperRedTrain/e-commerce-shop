import {Grid, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { commerce } from '../lib/commerce';


function Login(){
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onEmailUnfocused = (e) => {
        if (! email) {
            setEmailError(true);
            setEmailHelper("Please provide your email.");
        } else {
            setEmailError(false);
            setEmailHelper("");
        }
    }


    const onSubmit = () => {
        if (! email){
            setEmailError(true);
            setEmailHelper("Please provide your email.");
        } else {
            console.log(email);
            commerce.customer.login(email, "http://localhost:3002/user").then(
                (token) => console.log(token));
                setEmailSent(true);
                
        }
    }

    if(emailSent) {
        return <div>An email is sent to your email address.</div>
    }


    return(        
        <Grid item container direction="column">
            <Grid item>
                <h3>Login</h3>
            </Grid>

            <Grid item>
                <TextField label="Please enter your email" onChange={onEmailChange} 
                    error={emailError}
                    helperText={emailHelper}
                    onBlur={onEmailUnfocused}
                />
            </Grid>

            <Grid item>                                
                <Button 
                    onClick={onSubmit}           
                > Get login token</Button>
            </Grid>

        </Grid>
    )
    
}

export default Login;