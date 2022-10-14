import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import {cabretApi, getOrderList,deleteOrder} from '../../../redux/api'
import Loader from '../../../views/Loading/Loading';
import Popup from "../../../components/Popup";
import { useMediaQuery } from 'react-responsive'


// import Loader from '../../../components/Loader';
const ListMyExpense = (props) => {
  let [searchName, setSearchName] = useState('')
  let [searchList, setSearchList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('')
  const [orderList, setOrderList] = useState([])
  const isMobile = useMediaQuery({ maxWidth: 767 });


  useEffect(() => {
    getOrderData()
  }, [])

  const getOrderData = async () => {
    setLoading(true)
    try {
      const res = await getOrderList();
      // console.log("Res", res)
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
  
  const tableData = orderList && orderList.map((item, index) => {
     //console.log(item.acceptedQuote.totalCharge)
    console.log("orderlistacceped",orderList)
    const totalExpense = (item.expense?.labourCharge || 0) + ( item.expense?.transportCharge || 0) +(item.expense?.packingCharge || 0);
    return {
      _id: item._id,
      sno: index + 1,
      orderId: item.orderId || '-',
      pickUp: item.pickup && item.pickup.state || '-',
      destination: item.drop && item.drop.state || '-',
      Totalcost:item.acceptedQuote?.totalCharge || '-',
      labourCharge: item.expense?.labourCharge || '-',
      transportCharge: item.expense?.transportCharge || '-',
      packingCharge: item.expense?.packingCharge || '-',
      totalExpense: totalExpense || '-'
    }
  })

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
      name: 'Pick Up',
      selector: 'pickUp',
      sortable: true,
    },
    {
      name: 'Destination',
      selector: 'destination',
      sortable: true,
    },
    {
      name:'Totalcost',
      selector:'Totalcost',
      sortable:true
    },
    {
      name: 'Total Expense',
      selector: 'totalExpense',
      sortable: true
    },
    {
      name: 'Transportation Charge',
      selector: 'transportCharge',
      sortable: true
    },
    {
      name: 'Labour Charge',
      selector: 'labourCharge',
      sortable: true
    },
    {
      name: 'Packing Charge',
      selector: 'packingCharge',
      sortable: true
    },
   {
      name: 'Action',
      selector: 'action',
      sortable: false,
    
      cell: row => <div>
        <Link to={{
          pathname: '/my-expense/create',
          state:{
            id: row._id
          }
        }}>Add Expense</Link>
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
        padding: '12px',
        overflow: 'auto'
        
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
        title="Order List"
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
    </div>
  );
}
export default ListMyExpense;
