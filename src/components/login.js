import {Grid, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { commerce } from '../lib/commerce';


function Login(){
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");

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
            commerce.customer.login(email, "http://172.31.23.91:3001/login/callback").then(
                (token) => console.log(token));
        }



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