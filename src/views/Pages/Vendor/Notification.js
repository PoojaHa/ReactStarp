import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, CustomInput } from "reactstrap";
import DataTable, { createTheme } from 'react-data-table-component';
import { getNextMerchant } from '../../../redux/merchant/actions'
import { connect } from 'react-redux'
import { cabretApi } from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const ConsumerNotification = (props) => {
    const { deleteUser, merchants, isNext, nextId } = props;
    const [isNotify, setIsNotify] = useState(false)
    let [selectedRows, setSelectedRows] = useState([]);
    let [modal, setModal] = useState(false)
    const [fcmTokens, setFcmTokens] = useState();
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')

    useEffect(() => {
        setLoading(true)
        let data={
         role:'MERCHANT'
        };
        if (merchants && merchants.length <= 0) {
            props.getNextMerchant(data)
            setTimeout(() => { setLoading(false) }, 1000)

        } else {
            props.getNextMerchant(data,nextId)
            setTimeout(() => { setLoading(false) }, 1000)

        }

    }, [])
    const handleDelete = (e, id) => {
        e.preventDefault()
        deleteUser(id)
    }

    const handleSelectedRow = (data) => {
        console.log("fcm", data);
        const fcmTokenData = [];
        data.selectedRows.forEach(el => {
            if (el.fcmToken) {
                fcmTokenData.push(el.fcmToken)
            }
        });
        console.log("fcmTokenData", fcmTokenData)
        setFcmTokens(fcmTokenData)
    }

    const sendNotification = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log("message", message);
        console.log("tokens", fcmTokens);
        const data = {
            notificationIds: fcmTokens,
            data: { type: "offers" },
            notification: { message: message }
        }
        cabretApi.post('/api/send-notification/all', data)
            .then(res => {
                setLoading(false)
                setError(false)
                setSucessMsg('Notification sent successfully')
                setSucess(true)
                setMessage('')
                setIsNotify(!isNotify)
            })
            .catch(err => {
                setErrMsg(err.response.data.message)
                setLoading(false)
                setError(true)
                setIsNotify(!isNotify)
});
    }

    if (isNext && nextId) {
        let data = {
            role:'MERCHANT'
        }
        setTimeout(() => {
            props.getNextMerchant(data,nextId)
        }, 10000)
    }
    let data = merchants && Object.values(merchants).map((item, index) => {
        return {
            sno: index + 1,
            key: 'user' + index,
            id: item._id ? item._id : 'NA',
            name: item.fullname ? item.fullname : 'NA',
            referral: item.referral ? item.referral : 'NA',
            status: item.isActive ? 'Active' : 'InActive',
            dateofjoining: item.createdAt ? item.createdAt.slice(0, 10) : 'NA',
            parentname: item.parent && item.parent.fullname ? item.parent.fullname : 'NA',
            parentzkey: item.parent && item.parent.referral ? item.parent.referral : 'NA',
            city: item.address && item.address.city ? item.address.city : 'NA',
            phone: item.phone ? item.phone : 'NA',
            email: item.email ? item.email : 'NA',
            action: '',
            isActive: item.isActive,
            fcmToken: item.fcmToken,
        }
    })
    const columns = [
        {
            name: 'S.No',
            selector: 'sno',
            sortable: true,
        },
        {
            name: 'User Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Date of joining',
            selector: 'dateofjoining',
            sortable: true,
        },
        {
            name: 'City',
            selector: 'city',
            // sortable: true,
        },
        {
            name: 'Phone no.',
            selector: 'phone',
            // sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            // sortable: true,
        },
        // {
        //     name: 'Deactivated consumers',
        //     selector: 'active',
        //     sortable: false,
        //     cell: row => <FormGroup check inline>
        //         <Input className="form-check-input" type="checkbox" />
        //     </FormGroup>
        // },
        {
            name: 'Action',
            selector: 'action',
            sortable: false,
            cell: row => <div>
                {/* <Link className='simple-edit-btn' to={{
                    pathname: '/zmp-master/zmpUser-update',
                    state: {
                        id: row.id
                    }
                }}>Edit</Link> */}
                {/* <Link className='delete-btn' > Delete</Link> */}
                {/* <Button className='delete-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</Button> */}
                <Link className='view-btn' to={{
                    pathname: '/merchant/merchant-detail',
                    state: {
                        id: row.id
                    }
                }}>View</Link>
            </div>
        },
    ];

    // const handleChange = (e) => {
    //     // You can use setState or dispatch with something like Redux so we can use the retrieved data
    // };
    const filter = () => {
        setModal(!modal);
    }


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
    return (
        <div className='zmp-user-page'>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <div className="headerNotification">
                {/* <div className="search-outer">
                    <input name="" className="search-box" placeholder="Search Micro Partner Name or Zkey" type="text" /><input className="search" value="" type="submit" />
                </div> */}
                <Button className="notification-btn" onClick={() => setIsNotify(!isNotify)}>Send Notification</Button>
            </div>

            {isNotify &&
                <div className="whiteBox" style={{ marginBottom: 20 }}>
                    <form>
                        <div className="form-element">
                            <label>Message</label>
                            <textarea className="form-control" placeholder="Enter Message" onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <div className="submit-wrap">
                            <button className="common-btn" onClick={sendNotification}>Send</button>
                        </div>
                    </form>
                </div>
            }

            <DataTable
                title="All Merchant"
                data={data}
                selectableRows
                columns={columns}
                pagination={true}
                paginationPerPage={10}
                customStyles={customStyles}
                theme="solarized"
                onSelectedRowsChange={handleSelectedRow}
            />

        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isNext: state.merchant.isNext,
        nextId: state.merchant.nextId,
        newList: state.merchant.newList,
        merchants: state.merchant.merchants
    }
}
export default connect(mapStateToProps, { getNextMerchant })(ConsumerNotification);

