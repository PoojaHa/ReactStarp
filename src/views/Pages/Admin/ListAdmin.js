import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, CustomInput } from "reactstrap";
import DataTable, { createTheme } from 'react-data-table-component';
import { deleteUser, getNextAdmin } from '../../../redux/auth/action/userActions'
import { connect } from 'react-redux'
import { cabretApi } from '../../../redux/api'
import AddBtn from '../../../components/AddBtn';
import Loader from '../../../views/Loading/Loading';
import ExportCSV from '../../../components/ExportCSV';
// import Loader from '../../../components/Loader';
const ListAdmin = (props) => {
    const { deleteUser, admins, isAdmin, adminId } = props
    let [selectedRows, setSelectedRows] = useState([]);
    let [modal, setModal] = useState(false)
    let [searchName, setSearchName] = useState('')
    let [searchList, setSearchList] = useState([])
    const [loading, setLoading] = useState(false)
    const [count,setCount] = useState(0)
    useEffect(() => {
        setLoading(true)
        let data = {
            role: 'SUBADMIN'
        }
        if (admins && admins.length <= 0) {
            props.getNextAdmin(data)
            setTimeout(() => { setLoading(false) }, 1000)
        } else {
            props.getNextAdmin(data, adminId)
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
        setLoading(true)
        e.preventDefault()
        deleteUser(id)
        setTimeout(() => {setCount(count + 1)},1500)
        setTimeout(() => { setLoading(false) },1000)
    }

    if (isAdmin && adminId) {
        let data = {
            role: 'MERCHANT'
        }
        setTimeout(() => {
            props.getNextAdmin(data, adminId)
        }, 10000)

    }

    // const data = [
    //     { sno: 1, name: 'Apple Juice', type: 'juice', price: '120', action: '', active: '' },
    //     { sno: 2, name: 'Bean Juice', type: 'juice', price: '220', action: '', active: '' },
    //     { sno: 3, name: 'Light Speed Yellow Paint', type: 'paint', price: '320', action: '', active: '' }
    // ];
    const dataList = searchList.length > 0 && searchName.length > 0 ? searchList : admins
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
    let data = admins && Object.values(admins).map((item, index) => {
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
            name: 'Admin Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Date of joining',
            selector: 'dateofjoining',
            sortable: true,
        },
        // {
        //     name: 'City',
        //     selector: 'city',
        //     sortable: true,
        // },
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
        //     name: 'Deactivated admins',
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
                <Link className='simple-edit-btn' to={{
                    pathname: '/sub-admin/update',
                    state: {
                        id: row.id
                    }
                }}>Edit</Link>
                {/* <Link className='delete-btn' > Delete</Link> */}
                <Link className='delete-action' onClick={(e) => { handleDelete(e, row.id) }}>Delete</Link>
                {/* <Link className='view-btn' to={{
                    pathname: '/merchant/merchant-detail',
                    state: {
                        id: row.id
                    }
                }}>View</Link> */}
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
    return (
        <div className='zmp-user-page'>
            {loading && <Loader />}
            {/* <div className="search-outer"> */}
                <ExportCSV csvData={data} fileName={"Admin List"} />
            {/* </div> */}
            {/* <Popup error={true} message="Something went wrong error 505"/> */}
            {/* <Loader /> */}
            <DataTable
                title="All Admins"
                data={data}
                // selectableRows
                columns={columns}
                pagination={true}
                paginationPerPage={10}
                customStyles={customStyles}
                theme="solarized"
                responsive={true}
            />
            <AddBtn to="/sub-admin/create" />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isAdmin: state.auth.isAdmin,
        adminId: state.auth.adminId,
        newList: state.auth.newList,
        admins: state.auth.admins
    }
}
export default connect(mapStateToProps, { getNextAdmin, deleteUser })(ListAdmin);

