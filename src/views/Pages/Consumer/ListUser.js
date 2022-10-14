import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import {cabretApi,deleteUser} from '../../../redux/api'
import AddBtn from '../../../components/AddBtn';
import Loader from '../../../views/Loading/Loading';
import Popup from "../../../components/Popup";
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import {  getUserLists} from '../../../redux/consumer/actions';
import { getUserList } from '../../../redux/api';
//import { getUserList } from '../../../redux/api';
import { keyBy } from 'lodash';
//import { set } from 'core-js/core/dict';

// import Loader from '../../../components/Loader';
const ListUser = (props) => {
  let [searchName, setSearchName] = useState('')
  let [searchList, setSearchList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('')

  const [userList, setUserList] = useState([])
  const isMobile = useMediaQuery({ maxWidth: 767 });


  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    setLoading(true)
    try {
      const res = await getUserList();
      const users= res && res.data.data.users || [];
      setUserList(users);
      //console.log('userskey', keyBy(users, '_id'))
      props.getUserLists(keyBy(users, '_id'))
      setLoading(false)
    }catch (e) {
      console.log("Error User" , e)
      setError(true);
      setErrMsg('Something went wrong')
    }finally {
      setLoading(false)
    }
  }
  const tableData = userList && userList.map((item, index) => {

    return {
      sno: index + 1,
      id: item._id,
      kridoId: item.kridoId || '-',
      name: item.name || '-',
      email: item.email || '-',
      phone: item.mobile || '-',
      role: item.role || '-',
    }
  })
console.log("tabledatauser",tableData)
  const handleDelete = async (e,user) => {
  try{
    setLoading(true);
    e.preventDefault();
    //console.log('singleuser',user);
    const userId = user.id;
    const res = await deleteUser(userId);
    console.log('deleteuser',res);
    setLoading(false)
    setError(false)
    setSucessMsg('User deleted successfully');
    setSucess(true)
   await getUserData();
  }catch(error){
    console.log(error);
    setErrMsg(error.message);
    setLoading(false);
  }finally{
    setLoading(false)
  }
   
  }

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
  const handleBlock = (e, id, isBlock) => {
    e.preventDefault()
    setLoading(true)
    let data = {
      blockedUser: !isBlock,
    }
    // cabretApi.put(`/api/user/${id}`, data).then(res => {
    //     props.updateMerchant(res.data.data)
    //     setTimeout(() => { setLoading(false) }, 2000)
    //     setTimeout(() => { setSucessMsg('Vendor Blocked successfully'); }, 1)
    //     setTimeout(() => { setSucess(true) }, 2000)
    // }).catch(err => {
    //     console.log(err)
    //     if(err.response && err.response.data && err.response.data.message)
    //     {setErrMsg(err.response.data.message)}
    //     else
    //     {setErrMsg('System Error')}
    //     setLoading(false)
    //     setError(true)
    // })
  }


  const columns = [
    {
      name: 'S.No',
      selector: 'sno',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      conditionalCellStyles:[
        {
          when: row => isMobile && row.sno % 2 != 0,
          style:{
            position: 'sticky',
            left: 0,
            zIndex:1,
            background: '#ffffff !important'
          }
        },
        {
          when: row => isMobile && row.sno % 2 == 0,
          style:{
            position: 'sticky',
            left: 0,
            zIndex:1,
            background: '#E5F8FF !important'
          }
        },
    ]
    },
    {
      name: 'Krido Id',
      selector: 'kridoId',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Phone No.',
      selector: 'phone',
      sortable: true,
    },
    {
      name: 'Role',
      selector: 'role',
      sortable: true,
    },
    {
      name: 'Action',
      selector: 'action',
      sortable: false,
      cell: row => <div>
        <Link className='simple-edit-btn' to={{
          pathname: `/consumer/consumer-update`,
          state: {
            id: row.id
          }
        }}><i className='fa-solid fa-pen' style={{color:'black',fontSize:'15px'}}></i></Link>
        {/* <Link className='delete-btn' > Delete</Link> */}
        <Link className='delete-action' onClick={(e) => {handleDelete(e,row)}}><i className='fa-solid fa-trash' style={{color:'black',fontSize:'15px'}}></i></Link>
        <Link className='view-btn' to={{
          pathname: `/consumer/consumer-detail`,
          state: {
            id: row.id
          }
        }}><i className='fa-solid fa-eye' style={{color:'black',fontSize:'15px'}}></i></Link>
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
        padding: '10px',
      },
    },
  };
  return (
    <div className='zmp-user-page'>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <div className="search-outer">
        <input name="" className="search-box" placeholder="Search User name or Phone or Email" type="text" onChange={(e) => setSearchName(e.target.value)} /><input className="search" value="" type="submit" onClick={handleSearch} />
      </div>
      <DataTable
        title="All Users"
        data={tableData}
        // selectableRows
        columns={columns}
        pagination={true}
        paginationPerPage={10}
        customStyles={customStyles}
        theme="solarized"
        responsive={true}
        fixedHeader
        dense={isMobile}
      />
      <AddBtn to="/consumer/create" />
    </div>
  );
}
export default connect(null, {getUserLists})(ListUser);


