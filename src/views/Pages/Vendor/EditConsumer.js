/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { cabretApi } from '../../../redux/api'
import { Card, CardBody, CardHeader, Form, Label, Input, FormGroup, FormText, CardFooter, Button, Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane,} from 'reactstrap';
import ImageUploader from 'react-images-upload';
import classnames from 'classnames';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { updateMerchant, getMerchant } from '../../../redux/merchant/actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import * as formData from 'form-data';


// google location

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
// import Specification from './Specification'

const EditConsumer = (props) => {

    Geocode.setApiKey("AIzaSyCIcEH2EjZUolAf75ixHOCoPae3Az2QfnQ");
    Geocode.setLanguage("en");
    Geocode.enableDebug();


    const getAddress = (location) => {
        console.log("Long, laty", location)
    Geocode.fromLatLng(location[0], location[1]).then(
        // Geocode.fromLatLng(30.799264, 76.9149134).then(
        response => {
            const convertAddress = response.results[0].formatted_address;
            console.log("converted addresss",convertAddress);
            setAddress(convertAddress);
        },
        error => {
            console.error("Get address Error", error);
        }
    );
    }

    const history = useHistory()
    const { updateMerchant, getMerchant, } = props
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [flat, setFlat] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState(null)
    const [rest, setRest] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [user, setUser] = useState(null)
    const [activeTab, setActiveTab] = useState("1")

    const [storeName, setStoreName] = useState(null)
    const [description, setDescription] = useState(null)
    const [type, setType] = useState(null)
    const [storeAddress, setStoreAddress] = useState('');
    const [storeCity, setStoreCity] = useState('')
    const [storeState, setStoreState] = useState('');
    const [storePin, setStorePin] = useState('')
    const [openTime,setOpenTime] = useState()
    const [closeTime,setCloseTime] = useState()
    const [tableCapacity, setTableCapacity]=useState(null)
    const [latitude,setLatitude]=useState(null)
    const [longitude,setLongitude]=useState(null)
    const [tablePrice,setTablePrice]=useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')


    const [address, setAddress]= useState(null);

       // Stag Entry

    let [isMale, setIsMale] = useState(false);
    let [isFemale, setIsFemale] = useState(false);
    let [isCouple, setIsCouple] = useState(false);

    let [malePrice , setMalePrice] = useState(0);
    let [femalePrice , setFemalePrice] = useState(0);
    let [couplePrice , setCouplePrice] = useState(0);

    // console.log("user id", props.location.state.id)
    let uid = props.location.state && props.location.state.id
    useEffect(() => {
        setLoading(true)
        cabretApi.get(`/api/user/${uid}`).then(res => {
            console.log(res)
            if (res.data && res.data.data) {
                setUser(res.data.data)
                setLoading(false)
            }
            else {
                setErrMsg('something went wrong')
                setLoading(false)
                setError(true)            }
        }).catch(err => {
            console.log(err)
            setErrMsg(err && err.response && err.response.data && err.response.data.message || 'System Error')
            setLoading(false)
            setError(true)
        })
    }, [uid])
    if (user && rest) {
        setName(user.fullname ? user.fullname : null)
        setPhone(user.phone ? user.phone : null)
        setEmail(user.email ? user.email : null)
        setAge(user.age ? user.age : null)
        setGender(user.gender ? user.gender : null)
        if (user.address) {
            setArea(user.address.area ? user.address.area : null)
            setCity(user.address.city ? user.address.city : null)
        }
        else {
            setArea(null)
            setCity(null)
        }
        if(user.store){
        setStoreName(user.store.name ? user.store.name : null)
        setDescription(user.store.description ? user.store.description : null)
        setType(user.store.type? user.store.type : 'Enter type')
        setLatitude(user.store.location && user.store.location.coordinates && user.store.location.coordinates[1])
        setLongitude(user.store.location && user.store.location.coordinates && user.store.location.coordinates[0])
        let location = user.store.location ? user.store.location.coordinates : [0,0];
        getAddress(location);
        setTableCapacity(user.store.tableCapacity ? user.store.tableCapacity :null)
        setTablePrice(user.store.price ? user.store.price :0)
        setOpenTime(user.store.openTime ? user.store.openTime : ':')
        setCloseTime(user.store.closeTime ? user.store.closeTime : ':')
         setIsMale(user.store.isFemaleStag || false);
         setIsFemale(user.store.isFemaleStag || false);
        setIsCouple(user.store.isCoupleStag || false);
        setMalePrice(user.store.maleStagPrice || 0);
        setFemalePrice(user.store.femaleStagPrice || 0);
         setCouplePrice(user.store.coupleStagPrice || 0);
        }
        if (user.store && user.store.address) {
            setStoreAddress(user.store.address.area ? user.store.address.area : null)
            setStoreCity(user.store.address.city ? user.store.address.city : null)
            setStoreState(user.store.address.state ? user.store.address.state : null)
            setStorePin(user.store.address.pincode ? user.store.address.pincode : null)

        }
        else {
            setStoreAddress(null)
            setStoreCity(null)
            setStoreState(null)
            setStorePin(null)
    }
        setRest(false)
    }
    const handleSubmit = () => {
        setLoading(true)
        let data = {}
        if ((user && user.fullname === null) || name !== user.fullname)
            data.fullname = name
        if ((user && user.email == null) || email !== user.email)
            data.email = email
        if ((user && user.age == null) || age !== user.age)
            data.age = age
        if ((user && user.gender == null) || gender !== user.gender)
            data.gender = gender
        if ((user && user.phone == null) || phone !== user.phone)
            data.phone = phone
        let address = {
            name,
            area,
            city,
            mobile: phone,
        }
        data.address = address
        // updateMerchant(props.location.state.id,data)
        // let dataInput=JSON.stringify(data)
        cabretApi.put(`/api/user/${uid}`, data).then(res => {
            console.log("output", res)
            props.updateMerchant(res.data.data)
            setTimeout(() => { setLoading(false) }, 2000)
            setTimeout(() => { setSucessMsg('Vendor updated successfully'); }, 1)
            setTimeout(() => { setSucess(true) }, 2000)
            setTimeout(() => {
                history.push('/merchant/merchant-list')
            }, 4000)

        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }
    const handleStore=(e)=>{
        setLoading(true)
        e.preventDefault()
        let addres = {
            name,
            area: storeAddress,
            city:storeCity,
            state:storeState,
            pincode: storePin,
        }
        const  location = { "type": "Point", "coordinates": [latitude, longitude] }

        let data={
            name:storeName,
            description,
            type,
            address:addres,
            openTime,
            closeTime,
            tableCapacity,
            price:tablePrice,
            location:location,
             maleStagPrice: malePrice,
            femaleStagPrice: femalePrice,
            coupleStagPrice: couplePrice,
            isCoupleStag: isCouple,
            isMaleStag: isMale,
            isFemaleStag: isFemale,
        }
       let id=user && user.store && user.store._id

       if(user && user.store)
       {
        cabretApi.put(`/api/online-store/${id}`, data).then(res => {
            console.log(res)
            setLoading(false)
            setError(false)
            setSucessMsg('Store updated successfully')
            setSucess(true)
            setTimeout(() => { history.push('/merchant/merchant-list')},2000)

        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }
    else
    {
        const dataBody = new formData();
        let picture="https://cabaret-test.s3.ap-south-1.amazonaws.com/onlineStores/2020-12-01T18%3A59%3A46.467Z-upperDesign.png";
        dataBody.append('name', name);
        dataBody.append('owner', uid);
        dataBody.append('description', description);
        dataBody.append('type', type)
        dataBody.append('price', tablePrice);
        dataBody.append('tableCapacity', tableCapacity);
        dataBody.append('address', JSON.stringify(addres));
        dataBody.append('onlineStores', picture);
        dataBody.append('isMaleStag',isMale);
        dataBody.append('isFemaleStag',isFemale);
        dataBody.append('isCoupleStag',isCouple);
        dataBody.append('maleStagPrice',malePrice);
        dataBody.append('femaleStagPrice',femalePrice);
        dataBody.append('coupleStagPrice',couplePrice);
        dataBody.append('location', JSON.stringify(location));
        console.log("form data post", dataBody)
        cabretApi.post('/api/online-store', dataBody).then(res => {
            console.log(res)
            setLoading(false)
            setError(false)
            setSucessMsg('Store created successfully')
            setSucess(true)
            setTimeout(() => { history.push('/merchant/merchant-list')},1000)

        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }
    }
    console.log('user--', user)


    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    const handleChange = (e) => {
        console.log("Set Address", e)
        setAddress(e)
    }
    const handleSelect = () => {
        geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          console.log('Success', latLng)
          setLatitude(latLng && latLng.lat)
          setLongitude(latLng && latLng.lng)
        })
      .catch(error => console.error('Error handel Select', error));
    }
    return (
        <>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                >
                    Edit Profile
                           </NavLink>
            </NavItem>
            { user && user.store &&
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                >
                    Edit Store
                            </NavLink>
            </NavItem>
           }
        </Nav>

        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                {/* <Card> */}
                    {/* <CardHeader>
                        <strong>Edit User</strong>
                    </CardHeader> */}
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label >Name</Label>
                                <Input type="text" value={name} placeholder="Enter Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                                {/* <FormText className="help-block">Please enter your password</FormText> */}
                            </FormGroup>
                            <FormGroup>
                                <Label >Age</Label>
                                <Input type="text" value={age} placeholder="Enter Age" autoComplete="age" onChange={(e) => setAge(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Gender</Label>
                                <Input type="text" value={gender} placeholder="Enter Gender" autoComplete="gender" onChange={(e) => setGender(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Email</Label>
                                <Input type="text" value={email} placeholder="Enter Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                                {/* <FormText className="help-block">Please enter your password</FormText> */}
                            </FormGroup>
                            <FormGroup>
                                <Label >Phone</Label>
                                <Input type="number" value={phone} placeholder="Enter Phone" autoComplete="phone" disabled />
                                {/* <FormText className="help-block">Please enter your password</FormText> */}
                            </FormGroup>
                            <FormGroup>
                                <Label >Area</Label>
                                <Input type="text" value={area} placeholder="Enter Area" autoComplete="area" onChange={(e) => setArea(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >City</Label>
                                <Input type="text" value={city} placeholder="Enter City" autoComplete="city" onChange={(e) => setCity(e.target.value)} />
                            </FormGroup>


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
                {/* </Card> */}
            </TabPane>
            { user && user.store &&
                <TabPane tabId="2">
                {/* <Card> */}
                    {/* <CardHeader>
                        <strong>Edit Store</strong>
                    </CardHeader> */}
                    <CardBody>
                        <Form>

                        <PlacesAutocomplete
                            value={address}
                            onChange={(e) => handleChange(e)}
                            onSelect={handleSelect}

                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                            <FormGroup>
                                <Label >Store Location</Label>
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

                            <FormGroup>
                                <Label > Store Name</Label>
                                <Input type="text" value={storeName} placeholder="Enter Store Name" autoComplete="storeName" onChange={(e) => setStoreName(e.target.value)} />
                                {/* <FormText className="help-block">Please enter your password</FormText> */}
                            </FormGroup>
                            <FormGroup>
                                <Label >Description</Label>
                                <Input type="text" value={description} placeholder="Enter Description" autoComplete="description" onChange={(e) => setDescription(e.target.value)} />
                            </FormGroup>
                            <div className="form-element">
                                <label for="exampleSelect">Type</label>
                                <select id="dropdown" className="form-control" onChange={(e) => setType(e.target.value)}>
                                    <option value={type} selected hidden>{type}</option>
                                    <option value='EVENT'>Event</option>
                                    <option value='BAR'>Bar</option>
                                    <option value='CLUB'>Club</option>
                                    <option value='RESTAURANT'>Restaurant</option>
                                </select>
                             </div>
                            <FormGroup>
                                <Label >Open Time</Label>
                                <Input type="time" value={openTime} placeholder="Open Time" autoComplete="open time" onChange={(e) => setOpenTime(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Close Time</Label>
                                <Input type="time" value={closeTime} placeholder="Close Time" autoComplete="close time" onChange={(e) => setCloseTime(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Table Capacity</Label>
                                <Input type="number" value={tableCapacity} placeholder="Table Capacity" autoComplete="tableCapacity" onChange={(e) => setTableCapacity(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Table Price</Label>
                                <Input type="number" value={tablePrice} placeholder="Table Price" autoComplete="tablePrice" onChange={(e) => setTablePrice(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Address</Label>
                                <Input type="text" value={storeAddress} placeholder="Enter Address" autoComplete="address" onChange={(e) => setStoreAddress(e.target.value)} />
                                {/* <FormText className="help-block">Please enter your password</FormText> */}
                            </FormGroup>
                            <FormGroup>
                                <Label >City</Label>
                                <Input type="text" value={storeCity} placeholder="Enter City" autoComplete="city" onChange={(e) => setStoreCity(e.target.value)} />
                                {/* <FormText className="help-block">Please enter your password</FormText> */}
                            </FormGroup>
                            <FormGroup>
                                <Label >State</Label>
                                <Input type="text" value={storeState} placeholder="Enter State" autoComplete="state" onChange={(e) => setStoreState(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Pincode</Label>
                                <Input type="text" value={storePin} placeholder="Enter Pincode" autoComplete="pin" onChange={(e) => setStorePin(e.target.value)} />
                            </FormGroup>
                            <div className="stagEntry-outer editStore">
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
                            <Button onClick={handleStore}>Submit</Button>
                        </Form>
                    </CardBody>
                {/* </Card> */}
                </TabPane>
            }
        </TabContent>
        </>

    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, { updateMerchant, getMerchant })(EditConsumer);
