import { commerce } from '../lib/commerce';
import {Grid, Button, TextField } from "@material-ui/core";
import { useState, useEffect} from "react";
import ReactPhoneInput from "react-phone-input-material-ui";


function UserProfile(){
    const [fullName, setfullName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [phoneHelper, setPhoneHelper] = useState("");

    const [updated, setUpdated] = useState(false);


    const onNameChange = (e) => {
        setfullName(e.target.value)
    }

    const onNameUnfocused = (e) => {
        if (! fullName) {
            setNameError(true);
            setNameHelper("Please provide your full name.");
        } else {
            setNameError(false);
            setNameHelper("");
        }
    }

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

    const onPhoneChange = (phoneNumber) => {
        setPhone(phoneNumber)
    }

    const onPhoneUnfocused = (e) => {
        if (phone.length !== 11) {
            setPhoneError(true);
            setPhoneHelper("Please complete your phone number.");
        } else {
            setPhoneError(false);
            setPhoneHelper("");
        }
    }

    const onSubmit = () => {

        if (phone.length !== 11) {
            setPhoneError(true);
            setPhoneHelper("Please complete your phone number.");
        } 
        
        if (! fullName){
            setNameError(true);
            setNameHelper("Please provide your full name.");
        }

        if (! email){
            setEmailError(true);
            setEmailHelper("Please provide your email.");
        }

        if(fullName && email && (phone.length == 11)){
            let splitname = fullName.split(' ');

            commerce.customer.update({
                email: email,
                firstname: splitname[0],
                lastname: splitname[1],
                phone: phone,
              }, commerce.customer.id())
                .then((customer) => {
                    console.log(customer);
                    setUpdated(true);
                });
        }
        
        
    }

    useEffect(() => {
        if(commerce.customer.isLoggedIn()){
            commerce.customer.about().then(
            (customer) => {console.log(customer);  
                setPhone(customer.phone); 
                setEmail(customer.email);  
                setfullName(customer.firstname.concat(" ", customer.lastname));           
            }
        );}

    }, [commerce.customer.isLoggedIn()]); 



    if(!commerce.customer.isLoggedIn()){
        return <h3>Please Login first!</h3>
    }
/* 
    if(commerce.customer.isLoggedIn()){
        console.log(commerce.customer.id());
    } */

    if(updated){
        return <h3>Updated!</h3>
    }


    return (
        
        <Grid item container direction="column">
            <Grid item>
                <h3>User Profile</h3>
            </Grid>

            <Grid item>
                <TextField label="Full name" onChange={onNameChange} 
                    InputLabelProps={{ shrink: true }} 
                    placeholder={fullName}
                    error={nameError}
                    helperText={nameHelper}
                    onBlur={onNameUnfocused}
                />
            </Grid>

            <Grid item>
                <TextField label="Email" onChange={onEmailChange} 
                    InputLabelProps={{ shrink: true }}
                    placeholder={email}
                    inputProps = {{readOnly: true, }}
                    error={emailError}
                    helperText={emailHelper}
                    onBlur={onEmailUnfocused}
                />
            </Grid>

            <Grid item>
                <ReactPhoneInput 
                    component = {TextField}
                    onChange = {onPhoneChange}
                    placeholder = {phone}
                    inputProps = {
                        {
                            error: phoneError,
                            helperText: phoneHelper,
                            onBlur: onPhoneUnfocused
                        }
                    }
                />
            </Grid>

            <Grid item>                
                
                <Button 
                    onClick={onSubmit}           
                > Update</Button>

            </Grid>



        </Grid>
    )

}

export default UserProfile;