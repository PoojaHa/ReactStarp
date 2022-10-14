/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { cabretApi } from '../../../redux/api'
import { Card, CardBody, CardHeader, Form, Label, Input, FormGroup, FormText, CardFooter, Button, Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ImageUploader from 'react-images-upload'
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { updateAdmin, getUser } from '../../../redux/auth/action/userActions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

// import Specification from './Specification'
const EditAdmin = (props) => {
    const history = useHistory()
    const { updateUser, getUser, } = props
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null);

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
        cabretApi.get(`/api/user/${uid}`).then(res => {
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
        setName(user.fullname ? user.fullname : 'Enter Name')
        setEmail(user.email ? user.email : 'Enter Email')
        setPhone(user.phone ? user.phone : 'Enter phone')
        setRest(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {}
        if ((user && user.fullname === null) || name !== user.fullname)
            data.fullname = name
        if ((user && user.email == null) || email !== user.email)
            data.email = email
        if ((user && user.phone == null) || phone !== user.phone)
            data.phone = phone
        // updateUser(props.location.state.id,data)
        // let dataInput=JSON.stringify(data)
        cabretApi.put(`/api/user/${uid}`, data).then(res => {
            props.updateAdmin(res.data.data)
            setTimeout(() => { setLoading(false) }, 2000)
            setTimeout(() => { setSucessMsg('Admins updated successfully'); }, 1)
            setTimeout(() => { setSucess(true) }, 2000)
            setTimeout(() => {
                history.push('/sub-admin')
            }, 4000)
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
                <strong>Edit Admin</strong>
            </CardHeader>
            <CardBody>
                <Form>
                    <div className="form-element">
                        <label >Name</label>
                        <Input type="text" value={name} placeholder="Meal Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                    </div>

                    <div className="form-element">
                        <label >Email</label>
                        <Input type="text" value={email} placeholder="Enter Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                        {/* <FormText className="help-block">Please Enter your password</FormText> */}
                    </div>
                    <div className="form-element">
                        <label >Phone</label>
                        <Input type="number" value={phone} placeholder="Enter Phone" autoComplete="phone" onChange={(e) => setPhone(e.target.value)} />

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
export default connect(mapStateToProps, { updateAdmin, getUser })(EditAdmin);
