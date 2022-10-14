import React, { useEffect, useState } from 'react';
import profileImage from '../../../assets/img/dummy.png';
import { getUser } from '../../../redux/consumer/actions'

import { cabretApi } from '../../../redux/api';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Container, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button, Alert } from 'reactstrap'

import { Link } from 'react-router-dom';
import moment from 'moment'
import Loader from '../../../components/Loader';
import { connect } from 'react-redux';

const UserDetails = (props) => {
    const { users } = props
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([])
    const [activeTab, setActiveTab] = useState("1")
    const [cardItem, setCardItem] = useState(true)
    const [walletData, setWalletData] = useState(null)
    const [loading, setLoading] = useState(false);
   

    const idUser = props.location.state && props.location.state.id
    const user = props.users[idUser] || {};
    console.log("users", user)
    
    
//    const Orderdata = users[idUser] && users[idUser].orders ? users[idUser].orders.map((item, index) => {
//         return {
//             sno: index + 1,
//             id: item._id,
//             orderStatus: item.orderStatus ? item.orderStatus : 'NA',
//             payStatus: item.paymentStatus ? item.paymentStatus : 'NA',
//             transaction: item.transactionId ? item.transactionId : 'NA',
//             amount: item.amount ? item.amount : 'NA',
//             date: item.createdAt ? moment(item.createdAt).format('LL') : 'NA'
//         }
//     }) : []
   
    // const Ordercolumns = [
    //     {
    //         name: 'S.No',
    //         selector: 'sno',
    //         sortable: true,
    //         maxWidth: '70px',
    //     },
    //     {
    //         name: 'Order  Status',
    //         selector: 'orderStatus',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Payment Status',
    //         selector: 'payStatus',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Transaction Id',
    //         selector: 'transaction',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Amount',
    //         selector: 'amount',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Date',
    //         selector: 'date',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Action',
    //         selector: 'action',
    //         sortable: false,
    //         cell: row => <div>
    //             {/* <Link className='simple-edit-btn' onClick={(e) => { ChangeOrderStatus(e, row.id) }}>
    //                 Edit</Link> */}
    //             {/* <Link className='delete-btn' > Delete</Link> */}
    //             {/* <Button className='delete-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</Button> */}
    //             <Link className='view-btn' to={{
    //                 pathname: '/orders/order-detail',
    //                 state: {
    //                     id: row.id
    //                 }
    //             }}>View</Link>
    //         </div>
    //     },
    // ]
    // createTheme('solarized', {

    //     context: {
    //         background: '#cb4b16',
    //     },
    //     divider: {
    //         default: '#DBDBDB',

    //     },
    //     action: {
    //         button: 'rgba(0,0,0,.54)',
    //         hover: 'rgba(0,0,0,.08)',
    //         disabled: 'rgba(0,0,0,.12)',
    //     },
    // });
    // const customStyles = {
    //     rows: {
    //         style: {
    //             textAlign: 'center' // override the row height
    //         }
    //     },
    //     headCells: {
    //         style: {
    //             backgroundColor: '#2DADD9',
    //             color: '#fff',
    //             textAlign: 'center',
    //             fontSize: 14,
    //             paddingLeft: '4px', // override the cell padding for head cells
    //             paddingRight: '4px',
    //         },
    //     },
    //     cells: {
    //         style: {
    //             padding: '12px',
    //         },
    //     },
    // };
    // const ChangeOrderStatus = (e) => {
    //     e.preventDefault();
    //     setModal(!modal);
    // }
    return (
        <div className="zmp-detail-page">
            {loading && <Loader />}
            <div className="col-bx-top">
                <div className="user-details">
                    <div className="repeatedrow">
                        <h3>Profile Information</h3>
                        <Container>
                            <Row>
                                <Col xs="2">
                                    <img src={users[idUser] && users[idUser].imageUrl ? users[idUser].imageUrl : require('../../../assets/img/no-image.svg')} className="profile-pic" />
                                </Col>
                                <Col xs="5">
                                    <p className="table-content">
                                        <span>Name</span>
                                        <span>:</span>
                                        <span>{user.name}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>KridoId </span>
                                        <span>:</span>
                                        <span>{user.kridoId}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>Mobile</span>
                                        <span>:</span>
                                        <span>{user.mobile}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>role</span>
                                        <span>:</span>
                                        <span>{user.role}</span>
                                    </p>
                                </Col>
                                <Col xs="5">
                                   
                                    <p className="table-content">
                                        <span>Email Id </span>
                                        <span>:</span>
                                        <span>{user.email}</span>
                                    </p>
                                    
                                    
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>

            {/* <div className="whiteBox" style={{ marginTop: 20 }}>
                <h4 className="title-heading">My Orders</h4>
                <DataTable
                    title="My Orders"
                    data={Orderdata}
                    // selectableRows
                    columns={Ordercolumns}
                    pagination={true}
                    paginationPerPage={10}
                    customStyles={customStyles}
                    theme="solarized"
                />


                <Modal isOpen={modal} toggle={ChangeOrderStatus}>
                    <ModalHeader toggle={ChangeOrderStatus}>Add Specification</ModalHeader>
                    <ModalBody>
                        <div className="form-element">
                            <label>Status</label>
                            <select className="form-control">
                                <option value='PENDING'>Pending</option>
                                <option value='CONFIRMED'>Confirmed</option>
                                <option value='REJECTED'>Rejected</option>
                                <option value='COMPLETED'>Completed</option>
                            </select>
                        </div>
                        <div className="form-element">
                            <label>Link</label>
                            <input type="text" className="form-control" placeholder="Enter Link" autoComplete="name" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ChangeOrderStatus}>Submit</Button>{' '}
                        <Button color="secondary" onClick={ChangeOrderStatus}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div> */}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        redux: state,
        users: state.consumer.users
    }
}
export default connect(mapStateToProps, {})(UserDetails);



