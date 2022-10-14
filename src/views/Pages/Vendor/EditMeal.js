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

// import Specification from './Specification'
const EditMeal = (props) => {
    const history = useHistory()
    const { updateUser, getUser, } = props
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null);

    const [rest, setRest] = useState(true)
    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')

    let uid = props.location.state && props.location.state.id
    useEffect(() => {
        setLoading(true)
        cabretApi.get(`/api/product/${uid}`).then(res => {
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
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }, [uid])
    if (user && rest) {
        setName(user.title ? user.title : 'Enter Name')
        setDescription(user.discription ? user.discription : 'Enter Description')
        setPrice(user.price ? user.price : 'Enter price')
        setRest(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {}
        if ((user && user.title === null) || name !== user.title)
            data.title = name
        if ((user && user.discription == null) || description !== user.discription)
            data.discription = description
        if ((user && user.price == null) || price !== user.price)
            data.price = price
        // updateUser(props.location.state.id,data)
        // let dataInput=JSON.stringify(data)
        cabretApi.put(`/api/product/${uid}`, data).then(res => {
            // props.updateUser(res.data.data)
            setLoading(false)
            setSucessMsg('Meals updated successfully')
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

    return (
        <Card>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <CardHeader>
                <strong>Edit Meal</strong>
            </CardHeader>
            <CardBody>
                <Form>
                    <div className="form-element">
                        <label >Name</label>
                        <Input type="text" value={name} placeholder="Meal Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                    </div>

                    <div className="form-element">
                        <label >Description</label>
                        <Input type="text" value={description} placeholder="Enter description" autoComplete="description" onChange={(e) => setDescription(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                    </div>
                    <div className="form-element">
                        <label >Price</label>
                        <Input type="number" value={price} placeholder="Enter price" autoComplete="price" onChange={(e) => setPrice(e.target.value)} />

                    </div>

                    {/* <FormGroup>
                        <Label >State</Label>
                        <Input type="text" value={state} autoComplete="state" onChange={(e) => setState(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label >PinCode</Label>
                        <Input type="text" value={pincode} autoComplete="pincode" onChange={(e) => setPincode(e.target.value)} />
                    </FormGroup> */}
                    <div className="submit-wrap">
                        <button className="common-btn" type="submit" size="sm" color="primary" onClick={handleSubmit}>Submit</button>
                        {/* <button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</button> */}
                    </div>
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
export default connect(mapStateToProps, { updateUser, getUser })(EditMeal);
