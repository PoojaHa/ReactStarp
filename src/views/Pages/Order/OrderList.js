import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import {cabretApi, getOrderList,deleteOrder} from '../../../redux/api'
import AddBtn from '../../../components/AddBtn';
import Loader from '../../../views/Loading/Loading';
import ExportCSV from '../../../components/ExportCSV';
import Popup from "../../../components/Popup";
import { useMediaQuery } from 'react-responsive'

// import Loader from '../../../components/Loader';
const OrderList = (props) => {
  let [query, setQuery] = useState(null);
  let [searchList, setSearchList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('')
   const [orderList, setOrderList] = useState([])
   const isMobile = useMediaQuery({ maxWidth: 767 });
   console.log('isMobile', isMobile)

  useEffect(() => {
    getOrderData()
  }, [])
  // console.log("listsearch",newOrderSearch)
  
  // useEffect(() => {
  //   setSearchName(newOrderSearch)
  // }, [searchName]);
  
  
  const getOrderData = async () => {
    setLoading(true)
    try {
      const res = await getOrderList();
      //console.log("Resorderlist", res)
      setOrderList(res && res.data.data.orders)
      setLoading(false)
    }catch (e) {
      console.log("Error User" , e)
      setError(true);
      setErrMsg('Something went wrong')
    }finally {
      setLoading(false)
    }
  }
  const formatDate = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()+1
    const year = new Date(date).getFullYear()
    return day+'/'+month+'/'+year
  }
  // get all data and transform , form1 => form2
  const tableData = (orderList || []).map((item, index) => {
     //console.log(item.bookedBy.name)
     //console.log(orderList)
    return {
      _id: item._id,
      sno: index + 1,
      orderId: item.orderId || '-',
      pickUp: item.pickup && item.pickup.state || '-',
      destination: item.drop && item.drop.state || '-',
      fromDate: formatDate(item.timeline.fromDate) || '-',
      toDate:  formatDate(item.timeline.toDate) || '-',
      status: item.status || 'pending',
      name: item.bookedBy && item.bookedBy.name || '-'
    }
  })
//console.log(orderList)

  // filter desired result
    const filteredData= query ? tableData.filter(value=> value.name.toLowerCase().includes(query.toLowerCase())) : tableData;
  
 //const filteredData = search();//debounce(search(), 200);


  const handleDelete = async (e,order) => {
    try{
      setLoading(true);
      e.preventDefault();
     const orderId = order._id;
     const res = await deleteOrder(orderId);
     console.log('deletedorder',res);
      setLoading(false)
      setError(false)
      setSucessMsg('User deleted successfully');
      setSucess(true)
     await getOrderData();
    }catch(error){
    console.log(error);
    setErrMsg(error.message);
    setLoading(false);
   }finally{
      setLoading(false)
    }
  }

  const columns = [
    {
      name: 'S.No',
      selector: 'sno',
      sortable: true,
    },
    {
      name: 'Order Id',
      selector: 'orderId',
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
      name:'Name',
      selector:'name',
      sortable:true
    },
    {
      name: 'Pick Up',
      selector: 'pickUp',
      sortable: true,
      wrap:true
    },
    {
      name: 'Destination',
      selector: 'destination',
      sortable: true,
    },
    {
      name: 'From Date',
      selector: 'fromDate',
      sortable: true,
    },
    {
      name: 'To Date',
      selector: 'toDate',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },
   
    {
      name: 'Action',
      selector: 'action',
      sortable: false,
      wrap:true,
    
      cell: row => <div style={{minWidth: 'max-content'}}>
         <Link className='simple-edit-btn' to={{
          pathname: `/order/edit-order`,
          state: {
            id: row._id
          }
        }} params={{ orderId: row._id }}> <i className='fa-solid fa-pen' style={{color:'black',fontSize:'15px'}}></i></Link>
      
        {/*<Link className='simple-edit-btn' to={{*/}
        {/*  pathname: 'javascript:;',*/}
        {/*  state: {*/}
        {/*    id: row.id*/}
        {/*  }*/}
        {/*}}>Edit</Link>*/}
        {/* <Link className='delete-btn' > Delete</Link> */}
        <Link className='delete-action' onClick={(e) => {handleDelete(e,row)}}> <i className='fa-solid fa-trash' style={{color:'black',fontSize:'18px'}}></i></Link>
        <Link className='view-btn'  to={{
          pathname: `/order/${row.orderId}`,
          state: {
            id: row._id
          }
        }} params={{ orderId: row._id }}><i className='fa-solid fa-eye' style={{color:'black',fontSize:'16px'}}></i></Link>
  
      </div>
    },
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value)
    
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
        padding: '12px',
      },
    },
  };
  return (
    <div className='zmp-user-page'>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <div className="search-outer">
        <input name="text" className="search-box" placeholder="Search User name or Phone or Email" type="text"  onClick="processChange()" onChange={(e) => setQuery(e.target.value)} /><input className="search" value="" type="submit" onClick={handleSearch} />
      </div>
      <DataTable
      key='1'
        testID={'order-table'}
        title="Order List"
        data={filteredData}
        // selectableRows
        columns={columns}
        pagination={true}
        paginationPerPage={10}
        customStyles={customStyles}
        theme="solarized"
        responsive
        fixedHeader
        dense={isMobile}
      />
      <AddBtn to="/order/create-order" />
    </div>
  );
}
export default OrderList;

