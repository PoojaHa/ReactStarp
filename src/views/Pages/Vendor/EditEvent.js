/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { cabretApi } from '../../../redux/api'
import { Card, CardBody, CardHeader, Form, Label, Input, FormGroup, FormText, CardFooter, Button, Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ImageUploader from 'react-images-upload'
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { updateUser, getUser } from '../../../redux/auth/action/userActions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';


// google location

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";

// import Specification from './Specification'
const EditEvent = (props) => {
    Geocode.setApiKey("AIzaSyCIcEH2EjZUolAf75ixHOCoPae3Az2QfnQ");
    Geocode.setLanguage("en");
    Geocode.enableDebug();


    // const getAddress = (location) => {
    //     console.log("Long, laty", location)
    // Geocode.fromLatLng(location[0], location[1]).then(
    //     response => {
    //         const convertAddress = response.results[0].formatted_address;
    //         console.log("converted addresss",convertAddress);
    //         setAddress(convertAddress);
    //     },
    //     error => {
    //         console.error("Get address Error", error);
    //     }
    // );
    // }

    const history = useHistory()
    const { updateUser, getUser, } = props
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null)
    const [picture, setPicture] = useState(null)
    const [price, setPrice] = useState(null)
    const [eventDate, setEventDate] = useState(null)
    const [age, setAge] = useState(null)
    const [dress, setDress] = useState(null)
    const [dishType, setDishType] = useState(null)
    const [address, setAddress] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [pincode, setPincode] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [closeTime, setCloseTime] = useState(null)
    const [totalSeat, setTotalSeat] = useState(0);
    const [rest, setRest] = useState(true)
    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')

    const [adress, setAdress]= useState(null);
const [latitude,setLatitude]=useState(null)
    const [longitude,setLongitude]=useState(null)
    // Stag Entry

    let [isMale, setIsMale] = useState(false);
    let [isFemale, setIsFemale] = useState(false);
    let [isCouple, setIsCouple] = useState(false);

    let [malePrice , setMalePrice] = useState(0);
    let [femalePrice , setFemalePrice] = useState(0);
    let [couplePrice , setCouplePrice] = useState(0);


    let uid = props.location.state.id
    useEffect(() => {
        setLoading(true)
        cabretApi.get(`/api/online-store/${uid}`).then(res => {
            console.log(res)
            if (res.data && res.data.data) {
                setUser(res.data.data)
                setLoading(false)
            }
            else {
                setErrMsg('something went wrong')
                setLoading(false)
                setError(true)
            }
        }).catch(err => {
            console.log(err)
            setErrMsg(err && err.response && err.response.data && err.response.data.message || 'System Error')
            setLoading(false)
            setError(true)
        })
    }, [uid])

    const getAddress = (location) => {
        console.log("Long, laty", location)
        Geocode.fromLatLng(location[0], location[1]).then(
        response => {
            const convertAddress = response.results[0].formatted_address;
            console.log("converted addresss",convertAddress);
            setAdress(convertAddress);
        },
        error => {
            console.error("Get address Error", error);
        }
    );
    }
    if (user && rest) {
        setName(user.name ? user.name : null)
        setDescription(user.description ? user.description:null)
        setPrice(user.price ? user.price : null)
        setIsMale(user.isMaleStag || false);
        setIsFemale(user.isFemaleStag || false);
        setIsCouple(user.isCoupleStag || false);
        setMalePrice(user.maleStagPrice || null);
        setFemalePrice(user.femaleStagPrice || null);
        setCouplePrice(user.coupleStagPrice || null);
        setEventDate(user.eventDate ? user.eventDate : null);
        setTotalSeat(user.totalTicket ? user.totalTicket : 0)
        setStartTime(user.openTime ? user.openTime : 'Enter Open Time')
        setCloseTime(user.closeTime ? user.closeTime : 'Enter Close Time')
        setAge(user.minimumAge ? user.minimumAge :null)
        setLatitude(user.location && user.location.coordinates[0])
        setLongitude(user.location && user.location.coordinates[1])
        setDress(user.dressCode ? user.dressCode : null)
        setDishType(user.dishType ? user.dishType : null)
        if(user.location && user.location.coordinates && user.location.coordinates.length>0)
        getAddress(user.location.coordinates)
        if (user.address) {
            setAddress(user.address.area ? user.address.area : null)
            setCity(user.address.city ? user.address.city : null)
            setState(user.address.state ? user.address.state : null)
            setPincode(user.address.pincode ? user.address.pincode : null)

        }
        else {
            setAddress(null)
            setCity(null)
            setState(null)
            setPincode(null)
        }
        setRest(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const location = { "type": "Point", "coordinates": [latitude, longitude] }
console.log("location",location)
        let data = {}
        if ((user && user.name === null) || name !== user.name)
            data.name = name
        if ((user && user.description == null) || description !== user.description)
            data.description = description
        if ((user && user.price == null) || price !== user.price)
            data.price = price
        if ((user && user.eventDate == null) || eventDate !== user.eventDate)
            data.eventDate = eventDate
        if ((user && user.openTime == null) || startTime !== user.openTime)
            data.openTime = startTime
        if ((user && user.closeTime == null) || closeTime !== user.closeTime)
            data.closeTime = closeTime
        if ((user && user.minimumAge == null) || age !== user.minimumAge)
            data.minimumAge = age
        if ((user && user.dressCode == null) || dress !== user.dressCode)
            data.dressCode = dress
        if ((user && user.dishType == null) || dishType !== user.dishType)
            data.dishType = dishType
        let addres = {
            name,
            area: address,
            city,
            state,
            pincode,
        };
        data.totalTicket = totalSeat;
        data.address = addres;
          data.maleStagPrice= malePrice;
      data.femaleStagPrice= femalePrice;
      data.coupleStagPrice= couplePrice;
      data.isCoupleStag= isCouple;
      data.isMaleStag= isMale;
      data.isFemaleStag= isFemale;
        data.location= location;

        // updateUser(props.location.state.id,data)
        // let dataInput=JSON.stringify(data)
        cabretApi.put(`/api/online-store/${uid}`, data).then(res => {
            console.log("output", res)
        setLoading(false)
        setSucessMsg('Events updated successfully')
            setSucess(true)
            setTimeout(() => { setSucess(false) }, 2000)
            // setTimeout(() => {
            //     history.push('/consumer/consumer-detail')
            // }, 4000)
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }

    console.log('user--', user);



     const handleChange = (e) => {
        console.log("Set Address", e)
        setAdress(e)
    }
    const handleSelect = () => {
        geocodeByAddress(adress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          console.log('Success', latLng)
          setLatitude(latLng && latLng.lat)
          setLongitude(latLng && latLng.lng)
        })
      .catch(error => console.error('Error handel Select', error));
    }
    return (
        <Card>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <CardHeader>
                <strong>Edit Event</strong>
            </CardHeader>
            <CardBody>
                <Form>
                    <div className="form-element">
                        <label >Name</label>
                        <Input type="text" value={name} placeholder="Enter Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                    </div>

                    <div className="form-element">
                        <label >Description</label>
                        <Input type="text" value={description} placeholder="Enter description" autoComplete="description" onChange={(e) => setDescription(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                    </div>
                    <div className="form-element">
                        <label >Price</label>
                        <Input type="number" value={price} placeholder="Enter Price" autoComplete="price" onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label >Event Date</label>
                        <Input type="date" value={eventDate} placeholder="Select Date" autoComplete="" onChange={(e) => setEventDate(e.target.value)} />
                        {/* <DatePicker id="example-datepicker"
                        value={eventDate}
                        onChange={(v, f) => setEventDate(f)} />                 */}
                    </div>
                    <div className="form-element">
                        <label >Total Seats</label>
                        <Input type="number" value={totalSeat} placeholder="Total Seats" autoComplete="totalSeats" onChange={(e) => setTotalSeat(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label >Start Time</label>
                        <Input type="time" value={startTime} placeholder="Start Time" autoComplete="" onChange={(e) => setStartTime(e.target.value)} />
                        {/* <DatePicker id="example-datepicker"
                        value={eventDate}
                        onChange={(v, f) => setEventDate(f)} />                 */}
                    </div>
                    <div className="form-element">
                        <label >Close Time</label>
                        <Input type="time" value={closeTime} placeholder="Close Time" autoComplete="" onChange={(e) => setCloseTime(e.target.value)} />
                        {/* <DatePicker id="example-datepicker"
                        value={eventDate}
                        onChange={(v, f) => setEventDate(f)} />                 */}
                    </div>
                    <div className="form-element">
                        <label >Minimum Age</label>
                        <Input type="text" value={age} placeholder="Age Limit" autoComplete="agelimit" onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label >Dress Code</label>
                        <Input type="text" value={dress} placeholder="Dress Code" autoComplete="dresscode" onChange={(e) => setDress(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label for="exampleSelect"> Dish Type</label>
                        <select id="dropdown" className="form-control" onChange={(e) => setDishType(e.target.value)}>
                    <option value={null} selected hidden>{dishType}</option>
                            <option value='VEG'>Veg</option>
                            <option value='NONVEG'>Non-Veg</option>
                            <option value='MIX'>Veg and Non-Veg</option>
                        </select>
                    </div>
                    <div className="form-element">
                        <label >Address</label>
                        <Input type="text" value={address} placeholder="Enter Address" autoComplete="address" onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-element">
                <label>Event Location</label>
                    <PlacesAutocomplete
                            value={adress}
                            onChange={(e) => handleChange(e)}
                            onSelect={handleSelect}

                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                            <FormGroup>
                                {/* <Label >Store Location</Label> */}
                                <Input
                                {...getInputProps({
                                    type :'text' ,
                                placeholder: 'Search Places ...',
                                className: 'location-search-input'
                                })}
                                />

                                <div className="autocomplete-dropdown-container">
                                {/* {loading && <div>Loading...</div>} */}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </FormGroup>
                        </div>
                        )}
                    </PlacesAutocomplete>
                    </div>
                    <div className="form-element">
                        <label >City</label>
                        <Input type="text" value={city} placeholder="Enter City" autoComplete="city" onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label >State</label>
                        <Input type="text" value={state} placeholder="Enter State" autoComplete="state" onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label >Pincode</label>
                        <Input type="text" value={pincode} placeholder="Enter Pincode" autoComplete="pincode" onChange={(e) => setPincode(e.target.value)} />
                    </div>
                    <div className="stagEntry-outer">
                {/* Male Price */}
                    <div className="form-element">
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" checked={isMale} onChange={() => {setIsMale(!isMale); setMalePrice(0)}} />
                            Male Stag
                            </Label>
                        </FormGroup>
                        {isMale &&
                        <Input type="text" value={malePrice && malePrice != 0 && malePrice.toString()} placeholder="Enter Price" onChange={(e) => setMalePrice(e.target.value)} />
                        }
                    </div>
                    {/* Female Price */}
                    <div className="form-element">
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" checked={isFemale} onChange={() => {setIsFemale(!isFemale); setFemalePrice(0)}} />
                            Female Stag
                            </Label>
                        </FormGroup>
                        {isFemale &&
                        <Input type="text" value={femalePrice && femalePrice != 0 && femalePrice.toString()} placeholder="Enter Price" onChange={(e) => setFemalePrice(e.target.value)} />
                        }
                    </div>
                    {/* Couple Price */}
                    <div className="form-element">
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" checked={isCouple} onChange={() => {setIsCouple(!isCouple); setCouplePrice(0)}} />
                            Couple Stag
                            </Label>
                        </FormGroup>
                        {isCouple &&
                        <Input type="text" value={couplePrice && couplePrice != 0 && couplePrice.toString()} placeholder="Enter Price" onChange={(e) => setCouplePrice(e.target.value)} />
                        }
                    </div>
                </div>
                    {/* <FormGroup>
                        <Label >State</Label>
                        <Input type="text" value={state} autoComplete="state" onChange={(e) => setState(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label >PinCode</Label>
                        <Input type="text" value={pincode} autoComplete="pincode" onChange={(e) => setPincode(e.target.value)} />
                    </FormGroup> */}
                    <Button onClick={handleSubmit}>Submit</Button>
                </Form>
            </CardBody>
        </Card>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, { updateUser, getUser })(EditEvent);
