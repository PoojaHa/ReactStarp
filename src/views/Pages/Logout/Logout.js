import React from 'react';
import {Card,CardBody} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LogOut } from '../../../redux/auth/action/userActions';
const Logout = (props) => {
props.LogOut();
  return <div>
    <p>Loading...</p>
    <Redirect to='/login' />
        </div>
}

export default connect(null, { LogOut })(Logout);

