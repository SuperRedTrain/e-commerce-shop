import {Grid, MenuItem, Select, Button, TextField } from "@material-ui/core";
import { useState, useEffect} from "react";
import ReactPhoneInput from "react-phone-input-material-ui";
import { commerce } from "../../lib/commerce";

function ShippingForm({checkoutToken, setshippingInfo}) {
    const [country, setcountry] = useState("US");
    const [countries, setCountries] = useState(undefined);
    const [regions, setRegions] = useState(undefined);
    const [region, setRegion] = useState("");
    const [shippingMethods, setshippingMethods] = useState(undefined);
    const [shippingMethod, setshippingMethod] = useState("");


    const [fullName, setfullName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");
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




    useEffect(() => {
        commerce.services.localeListShippingCountries(checkoutToken).then(
            (response) => {
                setCountries(response["countries"]);
                setcountry(Object.keys(response["countries"])[0]);
            }
        )

    }, [checkoutToken]);

    console.log(countries);
    console.log(country);

    useEffect(() => {
        if(country) {
            commerce.services.localeListShippingSubdivisions(checkoutToken, country).then(
                (response) => {
                    setRegions(response["subdivisions"]);
                    setRegion(Object.keys(response["subdivisions"])[0]);
                }
            )
        }

    }, [checkoutToken, country]);

    console.log(regions);
    console.log(region);

    useEffect(() => {
        if (country && region) {
            commerce.checkout.getShippingOptions(checkoutToken, {
                "country": country,
                "region": region,
            })
            .then(
                (response) => {
                    setshippingMethods(response);
                    setshippingMethod(response[0]);                
                }
            )
        }
    }, [checkoutToken, country, region]);

    console.log(shippingMethods);
    console.log(shippingMethod);


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

        if (! email){
            setEmailError(true);
            setEmailHelper("Please provide your email.");
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
                    "street": address,
                    "city": city,
                    "country": country,
                    "region": region,
                    "shipping": shippingMethod,
                    "zip": zipcode,
                    "email": email,                    
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
                <TextField label="Email" onChange={onEmailChange} 
                    error={emailError}
                    helperText={emailHelper}
                    onBlur={onEmailUnfocused}
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

            { countries && country && <Grid item>
                <Select value={country} onChange={(e) => {setcountry(e.target.value)}}>

                    {
                        Object.keys(countries).map((countryCode) =>{
                            return <MenuItem value={countryCode} key={countryCode}>{countries[countryCode]}</MenuItem>
                        })
                    }
                </Select>

            </Grid>}

            { regions && region && <Grid item>
                <Select value={region} onChange={(e) => {setRegion(e.target.value)}}>
                    {
                        Object.keys(regions).map((regionCode) =>{
                            return <MenuItem value={regionCode} key={regionCode}>{regions[regionCode]}</MenuItem>
                        })
                    }
                </Select>

            </Grid>}

            { shippingMethods && shippingMethod && <Grid item>
                <Select value={shippingMethod} onChange={(e) => {setshippingMethod(e.target.value)}}>
                    {
                        shippingMethods.map((oneMethod) =>{
                            return <MenuItem value={oneMethod["id"]} key={oneMethod["id"]}>{oneMethod["description"]}</MenuItem>
                        })
                    }
                </Select>

            </Grid>}            



            <Grid item>
                <TextField label="Zipcode" onChange={onZipcodeChange} 
                    error={zipcodeError}
                    helperText={zipcodeHelper}
                    onBlur={onZipcodeUnfocused}
                />
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