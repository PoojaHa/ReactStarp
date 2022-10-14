import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Container, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button, Alert } from 'reactstrap'
import classnames from 'classnames';
import RequestCallBack from './RequestCallBack';
import RaiseQuery from './RaiseQuery';
import SellwithZoogol from './SellwithZoogol';
import SuggestaMerchant from './SuggestaMerchant';
import {cabretApi} from '../../../redux/api'
const ContactQueries = () => {
    // Active tabs
    const [activeTab, setActiveTab] = useState("1")
    // const []
    // useEffect(()=>{
    //     cabretApi.get('/api/feedback/feedbackType/Callback').then(res=>{
    //         console.log(res)

    //     })
    // })
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    // ACtive tabs ends


    return (
        <div className="contact-us-page">
            <div className="userRefferal">
                <RaiseQuery />
                    {/* <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                Request a Callback
                           </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                            Raise a Query
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                            Sell With Zoogol
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { toggle('4'); }}
                            >
                            Suggest a Vendor
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">

                        </TabPane> */}
                        {/* <TabPane tabId="2">

                        </TabPane>
                        <TabPane tabId="3">
                            <SellwithZoogol />
                        </TabPane>
                        <TabPane tabId="4">
                            <SuggestaMerchant />
                        </TabPane> */}
                    {/* </TabContent> */}
            </div>
        </div>
    )
}
export default ContactQueries
