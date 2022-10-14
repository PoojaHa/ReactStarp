import React, { useState,useEffect } from 'react';
import Loading from '../../../views/Loading/Loading'
import {adminLogin} from '../../../redux/api'
import { connect } from 'react-redux';
import {  AdminLogin, ResetLoginP1 } from '../../../redux/auth/actions';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import companyLogo from '../../../assets/img/brand/kridoLogo.png';
import Loader from '../../../views/Loading/Loading';
import Popup from '../../../components/Popup';
import { useHistory } from "react-router-dom";
import { useCreateLoginPostMutation } from '../../../ReduxApi/Login/LoginSlice';

  

const LoginPage = () => {
 
  const [email,Setemail]= useState("")
  const [password,SetPassword]=useState("")
  const [ Adddata, isLoading, isFething] = useCreateLoginPostMutation();
  const history = useHistory();
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const newPost = {
     email,
     password
  }
   await Adddata(newPost);
   history.push('/main-admin')
 
 }
//  useEffect(() => {
//   if (isFething) {
//       alert('login sucess');
//       setTimeout(() => {
//          
//       }, 1000)
//   }
// }, [isFething])

   return (
    <div className="app flex-row align-items-center">
        <Container>
        <Row className="justify-content-center">
            <Col md="8" className='loginPage'>
              <div className="company-logo">
                <img src={companyLogo} alt="Logo" />
              </div>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>

                      <InputGroup className="mb-3" key='email'>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" placeholder="Email" onChange={(e) => Setemail(e.target.value)} />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="password" onChange={(e)=>SetPassword(e.target.value)} />
                      </InputGroup>

                      <Row className='justify-content-center'>
                        <Col xs="4">
                          <Button  onClick={handleSubmit} color="primary" className="px-4">Submit</Button>
                          </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
   )
 }
 
 export default LoginPage
