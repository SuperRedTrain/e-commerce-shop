import {Grid, MenuItem, Select, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import ReactPhoneInput from "react-phone-input-material-ui";

function ShippingForm({checkoutToken, setshippingInfo}) {
    const [country, setcountry] = useState("1");

    const [fullName, setfullName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [phoneHelper, setPhoneHelper] = useState("");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [addressHelper, setAddressHelper] = useState("");
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);
    const [cityHelper, setCityHelper] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [zipcodeError, setZipcodeError] = useState(false);
    const [zipcodeHelper, setZipcodeHelper] = useState("");



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

    const onAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const onAddressUnfocused = (e) => {
        if (! address) {
            setAddressError(true);
            setAddressHelper("Please provide your address.");
        } else {
            setAddressError(false);
            setAddressHelper("");
        }
    }

    const onCityChange = (e) => {
        setCity(e.target.value)
    }

    const onCityUnfocused = (e) => {
        if (! city) {
            setCityError(true);
            setCityHelper("Please enter the city.");
        } else {
            setCityError(false);
            setCityHelper("");
        }
    }

    const onZipcodeChange = (e) => {
        setZipcode(e.target.value)
    }

    const onZipcodeUnfocused = (e) => {
        if (! zipcode) {
            setZipcodeError(true);
            setZipcodeHelper("Please enter the zipcode.");
        } else {
            setZipcodeError(false);
            setZipcodeHelper("");
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

        if (! address) {
            setAddressError(true);
            setAddressHelper("Please provide your address.");
        }

        if (! city) {
            setCityError(true);
            setCityHelper("Please enter the city.");
        }

        if (! zipcode) {
            setZipcodeError(true);
            setZipcodeHelper("Please enter the zipcode.");
        }
        
        if(fullName && (phone.length === 11) && address && city && zipcode){

            setshippingInfo(
                {
                    "name": fullName,
                    "phone": phone,
                    "address": address,
                    "city": city,
                    "zipcode": zipcode,
                    "country": country,
                }
            )
        }
    }

    console.log(checkoutToken);

    return (
        <Grid item container direction="column">
            <Grid item>
                <h3>Shipping Form</h3>
            </Grid>

            <Grid item>
                <TextField label="Full name" onChange={onNameChange} 
                    error={nameError}
                    helperText={nameHelper}
                    onBlur={onNameUnfocused}
                />
            </Grid>

            <Grid item>
                <ReactPhoneInput 
                    component = {TextField}
                    onChange = {onPhoneChange}
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
                <TextField label="Street address" onChange={onAddressChange} 
                    error={addressError}
                    helperText={addressHelper}
                    onBlur={onAddressUnfocused}
                />
            </Grid>

            <Grid item>
                <TextField label="City" onChange={onCityChange} 
                    error={cityError}
                    helperText={cityHelper}
                    onBlur={onCityUnfocused}
                />
            </Grid>

            <Grid item>
                <TextField label="Zipcode" onChange={onZipcodeChange} 
                    error={zipcodeError}
                    helperText={zipcodeHelper}
                    onBlur={onZipcodeUnfocused}
                />
            </Grid>

            <Grid item>
                <Select value={country} onChange={(e) => {setcountry(e.target.value)}}>
                    <MenuItem value="1">Country 1</MenuItem>
                    <MenuItem value="2">Country 2</MenuItem>
                </Select>

            </Grid>


            <Grid item>                
                
                <Button 
                    onClick={onSubmit}           
                > Use this shipping address</Button>

            </Grid>

        </Grid>    
    );
}

export default ShippingForm;