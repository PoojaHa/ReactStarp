import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Form, Label, Input, FormGroup, FormText, CardFooter, Button, Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { cabretApi } from '../../../redux/api'
import { connect } from 'react-redux'
import { updateMerchant } from '../../../redux/auth/action/userActions'
import { useHistory } from 'react-router-dom';
import * as formData from 'form-data';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

// google location

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";

const CreateEvent = (props) => {
    const history = useHistory()
    const { createCategory } = props
    const {id,ownerId} = props.location && props.location.state
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
    const [startTime,setStartTime] = useState(null)
    const [closeTime,setCloseTime] = useState(null)

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

    let[totalSeat, setTotalSeat] = useState(0);

    var DatePicker = require("reactstrap-date-picker");

    const handleChange=(v,f)=>{
     setEventDate(f)
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        let addres = {
            name,
            area: address,
            city,
            state,
            pincode: pincode,
        }
        const location = { "type": "Point", "coordinates": [latitude, longitude] }
        const dataBody = new formData();
        dataBody.append('name', name);
        dataBody.append('store', id);
        dataBody.append('owner',ownerId)
        dataBody.append('description', description);
        dataBody.append('type', 'EVENT');
        dataBody.append('price',price);
        dataBody.append('address',JSON.stringify(addres));
        dataBody.append('dressCode',dress);
        dataBody.append('eventDate',eventDate);
        dataBody.append('totalTicket', totalSeat);
        dataBody.append('dishType',dishType)
        dataBody.append('openTime', startTime)
        dataBody.append('closeTime', closeTime)
        dataBody.append('minimumAge',age)
        dataBody.append('isMaleStag',isMale);
       dataBody.append('isFemaleStag',isFemale);
       dataBody.append('isCoupleStag',isCouple);
       dataBody.append('maleStagPrice',malePrice);
       dataBody.append('femaleStagPrice',femalePrice);
        dataBody.append('coupleStagPrice',couplePrice);
        dataBody.append('onlineStores', picture);
        dataBody.append('location', JSON.stringify(location));
     if(isMale || isFemale ||isCouple)
     {
       dataBody.append('isStag',true);
     }
     else{
       dataBody.append('isStag',false);
     }
        cabretApi.post(`/api/online-store/${id}`, dataBody).then(res => {
            setLoading(false)
            setError(false)
            setSucessMsg('event created successfully')
            setSucess(true)
            setTimeout(() => { history.push('/merchant/merchant-list')},1000)

        }).catch(err => {
            console.log(err)
            setErrMsg(err && err.response && err.response.data && err.response.data.message || 'System Error')
            setLoading(false)
            setError(true)
        })
    }


     const handleChangeLocation = (e) => {
        setAdress(e)
    }
    const handleSelect = () => {
        geocodeByAddress(adress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          setLatitude(latLng && latLng.lat)
          setLongitude(latLng && latLng.lng)
        })
      .catch(error => console.error('Error handel Select', error));
    }
    return (
        <div className="whiteBox" style={{ marginBottom: 20 }}>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <h4 className="title-heading">Create Event</h4>
            <form>
                <div className="form-element">
                        <label>Upload Image</label>
                        <input className="form-control" type="file" autoComplete="image" onChange={e => { setPicture(e.target.files[0]); console.log(e.target.files[0]) }} />

                        {picture && <img src={URL.createObjectURL(picture)} alt="upload" style={{ width: 300, hight: 300 }} />}

                    </div>
                <div className="form-element">
                    <label >Name</label>
                    <Input type="text" placeholder="Enter Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                    {/* <FormText className="help-block">Please Enter your password</FormText> */}
                </div>

                <div className="form-element">
                    <label >Description</label>
                    <Input type="text" placeholder="Enter description" autoComplete="description" onChange={(e) => setDescription(e.target.value)} />
                    {/* <FormText className="help-block">Please Enter your password</FormText> */}
                </div>
                <div className="form-element">
                    <label >Price</label>
                    <Input type="number" placeholder="Enter Price" autoComplete="price" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-element">
                    <label >Event Date</label>
                    <Input type="date" placeholder="Select Date" autoComplete="" onChange={(e) => setEventDate(e.target.value)} />
                    {/* <DatePicker id="example-datepicker"
                        value={eventDate}
                        onChange={(v, f) => setEventDate(f)} />                 */}
                </div>
                <div className="form-element">
                    <label >Total Seats</label>
                    <Input type="text" placeholder="Total Seats" autoComplete="totalSeats" onChange={(e) => setTotalSeat(e.target.value)} />
                </div>
                <div className="form-element">
                    <label >Start Time</label>
                    <Input type="time" placeholder="Start Time" autoComplete="" onChange={(e) => setStartTime(e.target.value)} />
                    {/* <DatePicker id="example-datepicker"
                        value={eventDate}
                        onChange={(v, f) => setEventDate(f)} />                 */}
                </div>
                <div className="form-element">
                    <label >Close Time</label>
                    <Input type="time" placeholder="Close Time" autoComplete="" onChange={(e) => setCloseTime(e.target.value)} />
                    {/* <DatePicker id="example-datepicker"
                        value={eventDate}
                        onChange={(v, f) => setEventDate(f)} />                 */}
                </div>
                <div className="form-element">
                    <label >Minimum Age</label>
                    <Input type="text" placeholder="Age Limit" autoComplete="agelimit" onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-element">
                    <label >Dress Code</label>
                    <Input type="text" placeholder="Dress Code" autoComplete="dresscode" onChange={(e) => setDress(e.target.value)} />
                </div>
                <div className="form-element">
                    <label for="exampleSelect"> Dish Type</label>
                    <select id="dropdown" className="form-control" onChange={(e) => setDishType(e.target.value)}>
                        <option value={null} selected hidden>Select Type</option>
                        <option value='VEG'>Veg</option>
                        <option value='NONVEG'>Non-Veg</option>
                        <option value='MIX'>Veg and Non-Veg</option>
                    </select>
                </div>

                <div className="form-element">
                    <label >Address</label>
                    <Input type="text" placeholder="Enter Address" autoComplete="address" onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="form-element">
                <label>Event Location</label>
                    <PlacesAutocomplete
                            value={adress}
                            onChange={(e) => handleChangeLocation(e)}
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
                    <Input type="text" placeholder="Enter City" autoComplete="city" onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-element">
                    <label >State</label>
                    <Input type="text" placeholder="Enter State" autoComplete="state" onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="form-element">
                    <label >Pincode</label>
                    <Input type="text" placeholder="Enter Pincode" autoComplete="pincode" onChange={(e) => setPincode(e.target.value)} />
                </div>
                <div className="stagEntry-outer">
                {/* Male Price */}
                    <div className="form-element">
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" onChange={() => {setIsMale(!isMale); setMalePrice(0)}} />
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
                            <Input type="checkbox" onChange={() => {setIsFemale(!isFemale); setFemalePrice(0)}} />
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
                            <Input type="checkbox" onChange={() => {setIsCouple(!isCouple); setCouplePrice(0)}} />
                            Couple Stag
                            </Label>
                        </FormGroup>
                        {isCouple &&
                        <Input type="text" value={couplePrice && couplePrice != 0 && couplePrice.toString()} placeholder="Enter Price" onChange={(e) => setCouplePrice(e.target.value)} />
                        }
                    </div>
                </div>
                {/* <div className="form-element">
                        <label for="exampleSelect">Categories</label>
                        <select id="dropdown" className="form-control" onChange={handleDropdownChange} value={categories.value}>
                            <option value="1">select</option>
                            {dataInput.map(item => (
                                <option key={item.id} value={item.id}>{item.name}
                                </option>
                            ))}
                            <option value="N/A">N/A</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div> */}
                {/* <div className="form-element">
                        <Row>
                            <Col><label >Specification</label></Col>
                            <Col>
                                <div className="addSpecs">
                                    <button className="roundBtn" onClick={handleAppend}>Add</button>
                                </div>
                            </Col>
                            <Col>
                                <div className="addSpecs">
                                    <button className="roundBtn" onClick={toggle}>Add</button>
                                </div>
                            </Col>
                        </Row>
                    </div> */}

                {/* <div className="appendData">
                        {addSpecs.map((el) => <Specifications key={el.id + ''} id={el.id} keyData={el.key} value={el.value} />)}
                    </div> */}
                {/* <div className="form-element">
                        <label >Description</label>
                        <Input type="textarea" placeholder="Enter Desciption.." autoComplete="description" onChange={(e) => setDescription(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                {/* </div> */}
                <div className="submit-wrap">
                    <button className="common-btn" type="submit" size="sm" color="primary" onClick={handleSubmit}>Submit</button>
                    {/* <button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</button> */}
                </div>
            </form>
        </div>
    )
}
export default connect(null, { updateMerchant })(CreateEvent)
