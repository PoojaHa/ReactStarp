import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Form, Label, Input, FormGroup, FormText, CardFooter, Button, Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { cabretApi } from '../../../redux/api'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const CreateAdmin = (props) => {
    const history = useHistory()
    const { createCategory } = props
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        let data = {
            fullname: name,
            email,
            phone,
            password
        }
        console.log("register data", data)
        let dataInput = JSON.stringify(data)
        cabretApi.post('/api/auth/admin-register', dataInput, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setLoading(false)
            setError(false)
            setSucessMsg('Admin created successfully')
            setSucess(true)
            setTimeout(() => {
                history.push({
                    pathname: '/sub-admin'
                })
            }, 1000)
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }
    return (
        <div className="whiteBox" style={{ marginBottom: 20 }}>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <h4 className="title-heading">Add Admin</h4>
            <form>
                {/* <div className="form-element">
                        <label>Upload Image</label>
                        <input className="form-control" type="file" autoComplete="image" onChange={e => { setPicture(e.target.files[0]); console.log(e.target.files[0]) }} />
                        {picture && <img src={URL.createObjectURL(picture)} alt="upload" style={{ width: 300, hight: 300 }} />}

                    </div> */}
                <div className="form-element">
                    <label >Name</label>
                    <Input type="text" placeholder="Enter Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                    {/* <FormText className="help-block">Please Enter your password</FormText> */}
                </div>

                <div className="form-element">
                    <label >Email</label>
                    <Input type="text" placeholder="Enter email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                    {/* <FormText className="help-block">Please Enter your password</FormText> */}
                </div>
                <div className="form-element">
                    <label >Phone</label>
                    <Input type="number" placeholder="Enter Phone" autoComplete="phone" onChange={(e) => setPhone(e.target.value)} />

                </div>
                <div className="form-element">
                    <label >Password</label>
                    <Input type="password" placeholder="Enter Password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} />

                </div>
                {/* <div className="form-element">
                        <label for="exampleSelect">Type</label>
                        <select id="dropdown" className="form-control" onChange={(e) => { handleCategoryType(e.target.value) }}>
                            <option value={null} selected hidden>Select Type</option>
                            <option value="ONLINE">Online</option>
                            <option value="INSTORE">Instore</option>
                            <option value="MEMBERSHIP_PRODUCT">Membership Product</option>
                        </select>
                    </div> */}

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
export default connect(null)(CreateAdmin)
