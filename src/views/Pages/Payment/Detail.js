import React, { useEffect, useState } from 'react';
import profileImage from '../../../assets/img/dummy.png';
import { getStore } from '../../../redux/payment/actions'
import { connect } from 'react-redux'
import { cabretApi } from '../../../redux/api';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Container, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button, Alert } from 'reactstrap'
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment'
import Loader from '../../../components/Loader';

const PaymentDetails = (props) => {
    const { stores } = props
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([])
    const [activeTab, setActiveTab] = useState("1")
    const [cardItem, setCardItem] = useState(true)
    const [walletData, setWalletData] = useState(null)
    const [loading, setLoading] = useState(false)

    let activeCircle = 0
    let totalFriend = 0
    let totalMicro = 0
    let totalMacro = 0
    let totalMega = 0

    const newdata = []
    let idUser = props.location.state && props.location.state.id

    useEffect(() => {
        cabretApi.get('/api/wallet-number').then(res => {
            console.log("res", res)
            setWalletData(res.data.data[0])
        }).catch(err => {
            console.log(err)
        })
    }, [idUser])
    // useEffect(() => { getStore(idUser) }, [idUser])
    useEffect(() => {
        cabretApi.get(`/api/user/number/${idUser}`).then(res => {
            console.log(res)
            setData(res.data.data[0])
        }).catch(err => {
            console.log(err)
        })
    }, [idUser])
    
    useEffect(() => {
        setLoading(true)
        props.getStore(idUser)
        setTimeout(() => { setLoading(false) }, 1000)
    }, [idUser])
    console.log("user details", stores[idUser])
    if (data.circle && data.circle.length && data.circleWiseActivity && data.circleWiseMembership) {
        for (let i = 0; i < data.circle.length; i++) {
            let dataInput = { level: i, active: 0, inActive: 0, micro: 0, macro: 0, mega: 0 }
            for (let j = 0; j < data.circleWiseActivity.length; j++) {
                if (data.circleWiseActivity[j]._id.level === i && data.circleWiseActivity[j]._id.active === true) {
                    dataInput.active = data.circleWiseActivity[j].count
                }
                else if (data.circleWiseActivity[j]._id.level === i && data.circleWiseActivity[j]._id.active === false) {
                    dataInput.inActive = data.circleWiseActivity[j].count
                }
            }
            for (let j = 0; j < data.circleWiseMembership.length; j++) {
                if (data.circleWiseMembership[j]._id.level === i && data.circleWiseMembership[j]._id.active === "MICRO") {
                    dataInput.micro = data.circleWiseMembership[j].count
                }
                else if (data.circleWiseMembership[j]._id.level === i && data.circleWiseMembership[j]._id.active === "MACRO") {
                    dataInput.macro = data.circleWiseMembership[j].count
                } else if (data.circleWiseMembership[j]._id.level === i && data.circleWiseMembership[j]._id.active === "MEGA") {
                    dataInput.mega = data.circleWiseMembership[j].count
                }
            }
            newdata.push(dataInput)
        }
    }
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    console.log("data array", newdata)
    newdata && newdata.map(item => {
        activeCircle = activeCircle + item.active
        totalFriend = item.active + item.inActive + totalFriend
        totalMacro = totalMacro + item.macro
        totalMicro = totalMicro + item.micro
        totalMega = totalMega + item.mega

    });


    const transactionData = stores[idUser] && stores[idUser].payment && stores[idUser].payment.transactions ? stores[idUser].payment.transactions.map((item, index) => {
        return {
            sno: index + 1,
            id: item._id,
            transactionId: item.transactionId ? item.transactionId : 'NA',
            amount: item.amount ? item.amount : 'NA',
            date: item.date ? item.date.slice(0, 10) : 'NA',
        }
    }) : []
    const orderdata = [
        { sno: 1, type: 'Apple Juice', orderid: 'juice', status: '120', amount: '120', date: '11-7-2020' },
        { sno: 2, type: 'Apple Juice', orderid: 'juice', status: '120', amount: '120', date: '11-7-2020' },
        { sno: 3, type: 'Apple Juice', orderid: 'juice', status: '120', amount: '120', date: '11-7-2020' }
    ];
    const transactionColumn = [
        {
            name: 'S.No',
            selector: 'sno',
            sortable: true,
            maxWidth: '70px',
        },
        {
            name: 'Transaction Id',
            selector: 'transactionId',
            sortable: true,
        },
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
        },
        // {
        //     name: 'Action',
        //     selector: 'action',
        //     sortable: false,
        //     cell: row => <div>
        //         <Link className='simple-edit-btn' onClick={(e) => { ChangeOrderStatus(e, row.id) }}>
        //             Edit</Link>
        //         <Link className='delete-btn' > Delete</Link>
        //         <Button className='delete-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</Button>
        //         <Link className='view-btn' to={{
        //             pathname: '/orders/order-detail',
        //             state: {
        //                 id: row.id
        //             }
        //         }}>View</Link>
        //     </div>
        // },
    ]
    createTheme('solarized', {

        context: {
            background: '#cb4b16',
        },
        divider: {
            default: '#DBDBDB',

        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    });
    const customStyles = {
        rows: {
            style: {
                textAlign: 'center' // override the row height
            }
        },
        headCells: {
            style: {
                backgroundColor: '#2DADD9',
                color: '#fff',
                textAlign: 'center',
                fontSize: 14,
                paddingLeft: '4px', // override the cell padding for head cells
                paddingRight: '4px',
            },
        },
        cells: {
            style: {
                padding: '12px',
            },
        },
    };
    console.log("wallet data", walletData && walletData.approvedIncome)
    const ChangeOrderStatus = (e) => {
        e.preventDefault();
        setModal(!modal);
    }
    return (
        <div className="zmp-detail-page">
            {loading && <Loader />}
            <div className="col-bx-top">
                <div className="user-details">
                    <div className="repeatedrow">
                        <h3>Store Information</h3>
                        <Container>
                            <Row>
                                <Col xs="2">
                                    <img src={stores[idUser] && stores[idUser].shopImage ? stores[idUser].shopImage: require('../../../assets/img/no-image.svg')} className="profile-pic" />
                                </Col>
                                <Col xs="5">
                                    <p className="table-content">
                                        <span>Store Name</span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].name ? stores[idUser].name : 'NA'}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>Owner Name </span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].owner && stores[idUser].owner.fullname ? stores[idUser].owner.fullname : 'NA'}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>Type</span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].type ? stores[idUser].type : 'NA'}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>Joining Date</span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].createdAt ? stores[idUser].createdAt.slice(0, 10) : 'NA'}</span>
                                    </p>
                                </Col>
                                <Col xs="5">
                                    <p className="table-content">
                                        <span>Contact No. </span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].owner && stores[idUser].owner.phone ? stores[idUser].owner.phone : 'NA'}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>Account No </span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].bank && stores[idUser].bank.accNo ? stores[idUser].bank.accNo : 'NA'}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>Due Amount </span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].payment && stores[idUser].payment.duePayment ? stores[idUser].payment.duePayment : 'NA'}</span>
                                    </p>
                                    <p className="table-content">
                                        <span>City </span>
                                        <span>:</span>
                                        <span>{stores[idUser] && stores[idUser].address ? stores[idUser].address.city : 'NA'}</span>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            {/* <div className="card-box zmp-user-card">
                <div className="zmp-card-outer">
                    <Card className="text-white bg-info">
                        <CardBody>
                            <div>No. of Active Circles</div>
                            <div className="text-value">
                                {activeCircle}
                            </div>

                        </CardBody>
                    </Card>
                </div>

                <div className="zmp-card-outer">
                    <Card className="text-white bg-primary">
                        <CardBody>
                            <div>Total Friends</div>
                            <div className="text-value"> {totalFriend}
                            </div>

                        </CardBody>
                    </Card>
                </div>

                <div className="zmp-card-outer">
                    <Card className="text-white bg-warning">
                        <CardBody>
                            <div>Total Micro Partners</div>
                            <div className="text-value">{totalMicro}
                            </div>

                        </CardBody>
                    </Card>
                </div>

                <div className="zmp-card-outer">
                    <Card className="text-white bg-danger">
                        <CardBody>
                            <div>Total Macro Partners</div>
                            <div className="text-value">{totalMacro}
                            </div>

                        </CardBody>
                    </Card>
                </div>
                <div className="zmp-card-outer">
                    <Card className="text-white bg-primary">
                        <CardBody>
                            <div>Total Mega Partners</div>
                            <div className="text-value"> {totalMega}
                            </div>

                        </CardBody>
                    </Card>
                </div>
            </div> */}
            {/* <div className="col-bx-bottom userRefferal">
                <div className="repeatedrow">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>
                                My Account
                           </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                My Friend
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                My Purchase
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { toggle('4'); }}
                            >
                                My Payment
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '5' })}
                                onClick={() => { toggle('5'); }}
                            >
                                KYC Details
                            </NavLink>
                        </NavItem>
                        <NavItem>

                            <NavLink
                                className={classnames({ active: activeTab === '6' })}
                                onClick={() => { toggle('6'); }}
                            >
                                Activity Logs
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <td colspan="2">My Cashback</td>
                                        <td colspan="2">My Moneyback</td>
                                        <td colspan="2">My Income</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Approved Cashback</td>
                                        <td className="data-custom">{'\u20B9'}{stores[idUser].wallet && stores[idUser].wallet.cashBack && stores[idUser].wallet.cashBack.approved != null ? users[idUser].wallet.cashBack.approved : '0'}</td>
                                        <td>Moneyback Eligibility</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.moneyBack && users[idUser].wallet.moneyBack.moneyBackEligibility != null ? users[idUser].wallet.moneyBack.moneyBackEligibility.toFixed(2) : '0'}</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.income && users[idUser].wallet.income.approved != null ? users[idUser].wallet.income.approved : '0'}</td>
                                    </tr>
                                    <tr>
                                        <td>Pending Cashback</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.cashBack && users[idUser].wallet.cashBack.pending != null ? users[idUser].wallet.cashBack.pending : '0'}</td>
                                        <td>Amount of Purchases</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.moneyBack && users[idUser].wallet.moneyBack.amountOfPurchase != null ? users[idUser].wallet.moneyBack.amountOfPurchase : '0'}</td>
                                        <td>Pending Income</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.income && users[idUser].wallet.income.pending != null ? users[idUser].wallet.income.pending : '0'}</td>
                                    </tr>
                                    <tr>
                                        <td>Redeemed Cashback</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.cashBack && users[idUser].wallet.cashBack.redeemed != null ? users[idUser].wallet.cashBack.redeemed : '0'}</td>
                                        <td>Approved Moneyback</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.moneyBack && users[idUser].wallet.moneyBack.approved != null ? users[idUser].wallet.moneyBack.approved : '0'}</td>
                                        <td>Redeemed Income</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.income && users[idUser].wallet.income.redeemed != null ? users[idUser].wallet.income.redeemed : '0'}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td>Pending Moneyback</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.moneyBack && users[idUser].wallet.moneyBack.pending != null ? users[idUser].wallet.moneyBack.pending : '0'}</td>
                                        <td></td>
                                        <td className="data-custom"></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td>Redeemed Moneyback</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.moneyBack && users[idUser].wallet.moneyBack.redeemed != null ? users[idUser].wallet.moneyBack.redeemed : '0'}</td>
                                        <td></td>
                                        <td className="data-custom"></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td></td>
                       users[idUser]
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tabId="2">
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <td colspan="2">My Cashback</td>
                                        <td colspan="2">My Moneyback</td>
                                        <td colspan="2">My Income</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Friends</td>
                                        <td className="data-custom">{totalFriend}</td>
                                        <td>Total No. of Micro Partners</td>
                                        <td className="data-custom">{totalMicro}</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">1000</td>
                                    </tr>
                                    <tr>
                                        <td>Friends in Circle 1</td>
                                        <td className="data-custom">{newdata[0] && newdata[0].active && newdata[0].inActive ? newdata[0].active + newdata[0].inActive : 0}</td>
                                        <td>Total No. of Macro Partners</td>
                                        <td className="data-custom">{totalMacro}</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td>Active Friends in Circle 1</td>
                                        <td className="data-custom">{newdata[0] && newdata[0].active ? newdata[0].active : 0}</td>
                                        <td>Total No. of Mega Partners</td>
                                        <td className="data-custom">{totalMega}</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">1000</td>
                                    </tr>
                                    <tr>
                                        <td>Inactive Friends in Circle 1
                                        </td>
                                        <td className="data-custom">{newdata[0] && newdata[0].inActive ? newdata[0].inActive : 0}</td>
                                        <td>Active Circles</td>
                                        <td className="data-custom">{activeCircle}</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">1000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tabId="3">
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <td colspan="2">My Cashback</td>
                                        <td colspan="2">My Moneyback</td>
                                        <td colspan="2">My Income</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amount of Purchases</td>
                                        <td className="data-custom">{'\u20B9'}{users[idUser].wallet && users[idUser].wallet.moneyBack && users[idUser].wallet.moneyBack.amountOfPurchase != null ? users[idUser].wallet.moneyBack.amountOfPurchase : '0'}</td>
                                        <td>Macro Purchases</td>
                                        <td className="data-custom">0</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td>No. of Purchases</td>
                                        <td className="data-custom">2</td>
                                        <td>Macro Cancellations</td>
                                        <td className="data-custom">0</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td>Online Purchases</td>
                                        <td className="data-custom">1</td>
                                        <td>Untraced Purchase</td>
                                        <td className="data-custom">0</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td>Online Cancellations</td>
                                        <td className="data-custom">1</td>
                                        <td></td>
                                        <td className="data-custom"></td>

                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tabId="4">
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <td colspan="2">My Cashback</td>
                                        <td colspan="2">My Moneyback</td>
                                        <td colspan="2">My Income</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name of the Bank Account Holder</td>
                                        <td className="data-custom">{users[idUser] && users[idUser].payment && users[idUser].payment.accHolderName ? users[idUser].payment.accHolderName : 'NA'}</td>
                                        <td>Bank Account Number</td>
                                        <td className="data-custom">{users[idUser] && users[idUser].payment && users[idUser].payment.accNo ? users[idUser].payment.accNo : 'xxxxxxxxx'}</td>
                                        <td>Approved Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td>Name of the Bank</td>
                                        <td className="data-custom">{users[idUser] && users[idUser].payment && users[idUser].payment.bankName ? `${users[idUser].payment.bankName}  Bank` : 'NA'}</td>
                                        <td>IFSC Code of Bank</td>
                                        <td className="data-custom">{users[idUser] && users[idUser].payment && users[idUser].payment.ifsc ? users[idUser].payment.ifsc : 'NA'}</td>
                                        <td>Pending Income</td>
                                        <td className="data-custom">1000</td>
                                    </tr>
                                    <tr>
                                        <td>Bank Branch Name</td>
                                        <td className="data-custom">{users[idUser] && users[idUser].payment && users[idUser].payment.branch ? users[idUser].payment.branch : 'NA'}</td>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td>Redeemed Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td>Pending Moneyback</td>
                                        <td className="data-custom">{'\u20B9'}1100</td>
                                        <td>Total Redeemed Income</td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td>Redeemed Moneyback</td>
                                        <td className="data-custom">{'\u20B9'}1100</td>
                                        <td></td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="data-custom"></td>
                                        <td>Total Redeemed Moneyback</td>
                                        <td className="data-custom">{'\u20B9'}1100</td>
                                        <td></td>
                                        <td className="data-custom">{'\u20B9'}1000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tabId="5">
                            <table className="table custom-table custom-table-2">
                                <thead>
                                    <tr>
                                        <td>S.No.</td>
                                        <td>Member Zkey</td>
                                        <td>Member Name</td>
                                        <td>Member Photo</td>
                                        <td>ID Proof</td>
                                        <td>Address Proof</td>
                                        <td>Bank Proof</td>
                                        <td>Verify Status</td>
                                        <td>Verified Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>ZMPSUKH1824</td>
                                        <td>Sukhwinder Singh</td>
                                        <td className="img"><img src={require('../../../assets/img/dummy.png')} alt="user Pic" /></td>
                                        <td className="img"><img src={require('../../../assets/img/proof.png')} alt="id Proof" /></td>
                                        <td className="img"><img src={require('../../../assets/img/proof.png')} alt="Address Proof" /></td>
                                        <td className="img"><img src={require('../../../assets/img/proof.png')} alt="Bank Proof" /></td>
                                        <td className="status-success">Verified</td>
                                        <td>18.07.2020 10:30 A.M.</td>
                                    </tr>

                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tabId="6">
                            <table className="table custom-table custom-table-2">
                                <thead>
                                    <tr>
                                        <td>S.No.</td>
                                        <td>Action</td>
                                        <td>Description</td>
                                        <td >Date</td>
                                        <td>Time</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users[idUser] && users[idUser].logs && users[idUser].logs.map((item, key) => (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{item.action ? item.action.toUpperCase() : 'NA'}</td>
                                            <td>{item.text ? item.text : 'NA'}</td>
                                            <td>{item.createdAt ? item.createdAt.slice(0, 10) : 'NA'}</td>
                                            <td>{item.createdAt ? moment(item.createdAt).format('LT') : 'NA'}</td>
                                        </tr>
                                    ))

                                    }
                                    <tr>
                                        <td>2</td>
                                        <td>You visited Shopperstop Website.</td>
                                        <td>24742</td>
                                        <td>17.07.2020</td>
                                        <td>09:00 P.M.</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>You visited Amazon Website.</td>
                                        <td>24742</td>
                                        <td>16.07.2020</td>
                                        <td>11:15 A.M.</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>You visited Pepperfry Website.</td>
                                        <td>24742</td>
                                        <td>15.07.2020</td>
                                        <td>03:10 P.M.</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>You visited Myntra Website.</td>
                                        <td>24742</td>
                                        <td>14.07.2020</td>
                                        <td>05:30 P.M.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                    </TabContent>

                </div>

            </div> */}

            <div className="whiteBox" style={{ marginTop: 20 }}>
                <h4 className="title-heading">Total Transaction</h4>
                <DataTable
                    title="My Transaction"
                    data={transactionData}
                    // selectableRows
                    columns={transactionColumn}
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
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        stores: state.payment.stores
    }
}
export default connect(mapStateToProps, { getStore })(PaymentDetails);

