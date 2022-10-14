import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, CustomInput } from "reactstrap";
import DataTable, { createTheme } from 'react-data-table-component';
import { deleteStore, getNextStore } from '../../../redux/payment/actions'
import { connect } from 'react-redux'
import { cabretApi } from '../../../redux/api'
import AddBtn from '../../../components/AddBtn';
import Loader from '../../../views/Loading/Loading';
import Popup from '../../../components/Popup';
import ExportCSV from '../../../components/ExportCSV';

// import Loader from '../../../components/Loader';
const ListPayment = (props) => {
    const { deleteStore, stores, isStore, storeId } = props
    let [selectedRows, setSelectedRows] = useState([]);
    let [modal, setModal] = useState(false)
    let [searchName, setSearchName] = useState('')
    let [searchList, setSearchList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    let [txnId, setTxnId] = useState('')
    let [amount, setAmount] = useState(null)
    const [txnDate,setTxnDate]=useState(null)
    const [currentId,setCurrentId] = useState(null)
    const [count,setCount] = useState(0)
        useEffect(() => {
        setLoading(true)
        // let data = {
        //     role: 'MERCHANT'
        // }
        if (stores && stores.length <= 0) {
            props.getNextStore()
            setTimeout(() => { setLoading(false) }, 1000)
        } else {
            props.getNextStore(storeId)
            setTimeout(() => { setLoading(false) }, 1000)
        }

    }, [count])
    // useEffect(() => {
    //     let data={
    //         role:'MERCHANT'
    //     }
    //     cabretApi.post('/api/user/filter',data,{
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(res=>{
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }, [])
    const handleDelete = (e, id) => {
        e.preventDefault()
        deleteStore(id)
    }

    if (isStore && storeId) {
        setTimeout(() => {
            props.getNextStore(storeId)
        }, 10000)
    }

    // const data = [
    //     { sno: 1, name: 'Apple Juice', type: 'juice', price: '120', action: '', active: '' },
    //     { sno: 2, name: 'Bean Juice', type: 'juice', price: '220', action: '', active: '' },
    //     { sno: 3, name: 'Light Speed Yellow Paint', type: 'paint', price: '320', action: '', active: '' }
    // ];
    const dataList = searchList.length > 0 && searchName.length > 0 ? searchList : stores
    // let dataNew = dataList && dataList.map((item, index) => {
    //     return {
    //         sno: index + 1,
    //         key: 'user' + index,
    //         id: item._id ? item._id:'NA' ,
    //         name: item.fullname ? item.fullname :'NA',
    //         referral: item.referral ? item.referral:'NA' ,
    //         status:item.isActive ? 'Active' :'InActive',
    //         dateofjoining :item.createdAt ? item.createdAt.slice(0,10):'NA',
    //         parentname: item.parent && item.parent.fullname ? item.parent.fullname:'NA' ,
    //         parentzkey: item.parent && item.parent.referral ? item.parent.referral :'NA',
    //         city: item.address && item.address.city ? item.address.city :'NA',
    //         phone :item.phone  ? item.phone :'NA',
    //         email :item.email ? item.email :'NA' ,
    //         action: '',
    //         isActive: item.isActive,
    //         fcmToken: item.fcmToken,
    //     }
    // })
    let data = stores && Object.values(stores).map((item, index) => {
        return {
            sno: index + 1,
            key: 'user' + index,
            id: item._id ? item._id : 'NA',
            storeName: item.name ? item.name : 'NA',
            ownerName: item.owner && item.owner.fullname ? item.owner.fullname : 'NA',
            city: item.address && item.address.city ? item.address.city : 'NA',
            phone: item.owner && item.owner.phone? item.owner.phone : 'NA',
            amount: item.payment && item.payment.duePayment ? item.payment.duePayment : 0,
            accNo: item.bank && item.bank.accNo ? item.bank.accNo : 'NA',
            action: '',
            isActive: item.isActive,
            fcmToken: item.fcmToken,
        }
    })
    const ChangeOrderStatus = (e, id, type) => {
        e.preventDefault();
        // if (type == "MEMBERSHIP_PRODUCT") {
            setCurrentId(id)
            setModal(!modal);
        // }

    }
    const columns = [
        {
            name: 'S.No',
            selector: 'sno',
            sortable: true,
        },
        {
            name: 'Store Name',
            selector: 'storeName',
            sortable: true,
        },
        {
            name: 'Owner Name',
            selector: 'ownerName',
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
            name: 'Due Amount',
            selector: 'amount',
            // sortable: true,
        },
        {
            name: 'Acc. No',
            selector: 'accNo',
            // sortable: true,
        },
        // {
        //     name: 'Deactivated stores',
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
                {
                    row.amount > 0 ? <Link className='simple-edit-btn' onClick={(e) => { ChangeOrderStatus(e, row.id, row.type) }}>
                       { "Pay"} </Link> :
                        <Link className='simple-edit-btn'>
                            {"Paid"}</Link>
                }
                {/* <Link className='simple-edit-btn' onClick={(e) => { ChangeOrderStatus(e, row.id, row.type) }}>
                    {row.amount>0 ?"Pay" : "Paid"}</Link> */}
                {/* <Link className='delete-btn' > Delete</Link> */}
                {/* <Button className='delete-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</Button> */}
                <Link className='view-btn' to={{
                    pathname: '/payment/detail',
                    state: {
                        id: row.id
                    }
                }}>View</Link>
            </div>
        },
    ];

    const handleSearch = () => {
        cabretApi.get(`/api/search-user/${searchName}`).then(res => {
            setSearchList(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    };
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
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        if(txnId===null || txnId.trim()=='')
        {
            setErrMsg('Please Enter Transaction Id')
            setLoading(false)
            setError(true)
        } else if (amount === null || amount.trim() === '') {
            setErrMsg('Please Enter Amount')
            setLoading(false)
            setError(true)
        }
       else if (txnDate === null || txnDate.trim() == '') {
            setErrMsg('Please Enter Transaction Date')
            setLoading(false)
            setError(true)
        }
       else{
        let data = {
            duePayment: Number(amount),
            transaction: { transactionId:txnId, amount,date:txnDate}
        }
        // let dataInput=JSON.stringify(data)
        cabretApi.put(`/api/online-store/payment/${currentId}`, data).then(res => {

            setLoading(false)
            setError(false)
            setCount(count+1)
            setSucessMsg('Status updated sucessfully')
            setSucess(true)
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setSucess(false)
            setError(true)
        })
        setModal(!modal);
    }
    }

    const handleCancle = (e, id, type) => {
        e.preventDefault();
        setModal(!modal);

    }
    return (
        <div className='zmp-user-page'>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <div className="search-outer">
                <input name="" className="search-box" placeholder="Search" type="text" onChange={(e) => setSearchName(e.target.value)} /><input className="search" value="" type="submit" onClick={handleSearch} />
            </div>
            <ExportCSV csvData={data} fileName={"Consumer List"} />

            {/* <Popup error={true} message="Something went wrong error 505"/> */}
            {/* <Loader /> */}
            <DataTable
                title="All Payments"
                data={data}
                // selectableRows
                columns={columns}
                pagination={true}
                paginationPerPage={10}
                customStyles={customStyles}
                theme="solarized"
                responsive={true}
            />
            {/* <AddBtn to="/merchant/merchant-create" /> */}
            <Modal isOpen={modal} toggle={ChangeOrderStatus}>
                <ModalHeader toggle={handleCancle}>Change Status</ModalHeader>
                <ModalBody>
                    <div className="form-element">
                        <label>Transaction ID</label>
                        <input type="text" className="form-control" placeholder="Enter Transaction Id" autoComplete="transaction" onChange={(e) => setTxnId(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label>Amount</label>
                        <input type="text" className="form-control" placeholder="Enter Amount" autoComplete="amount" onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label>Transaction Date</label>
                        <input type="date" className="form-control" placeholder="Enter Date" autoComplete="date" onChange={(e) => setTxnDate(e.target.value)} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={handleCancle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isStore: state.payment.isStore,
        storeId: state.payment.storeId,
        newList: state.payment.newList,
        stores: state.payment.stores
    }
}
export default connect(mapStateToProps, { getNextStore })(ListPayment);

