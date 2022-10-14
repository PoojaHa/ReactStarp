import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import {cabretApi, getVendorsList} from '../../../redux/api'
import AddBtn from '../../../components/AddBtn';
import Loader from '../../../views/Loading/Loading';
import ExportCSV from '../../../components/ExportCSV';
import Popup from "../../../components/Popup";
import { useMediaQuery } from 'react-responsive'

// import Loader from '../../../components/Loader';
const ListVendor = (props) => {
    let [modal, setModal] = useState(false)
    let [searchName, setSearchName] = useState('')
    let [searchList, setSearchList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    const [vendorList, setVendorList] = useState([])
    const isMobile = useMediaQuery({ maxWidth: 767 });


    useEffect(() => {
        getMerchantData()
    }, [])

  const getMerchantData = async () => {
    setLoading(true)
    try {
      const res = await getVendorsList();
      setVendorList(res && res.data.data.vendors)
      setLoading(false)
    }catch (e) {
      console.log("Error Vendor" , e)
      setError(true);
      setErrMsg('Something went wrong')
    }finally {
      setLoading(false)
    }
  }
 const tableData = vendorList && vendorList.map((item, index) => {
   const operationalArea = (data) => {
     let str = ''
     data.map((item,i)=> {
       str+= item + ','
     })
     return str;
   }
   return {
     sno: index + 1,
     id: item._id,
     name: item.fullName || '-',
     email: item.email || '-',
     phone: item.mobile || '-',
     organisation_name: item.organization.name || '-',
     organisation_cat: item.organization.category || '-',
     organisation_location: item.organization.location || '-',
     organisation_area: operationalArea(item.organization.operationalArea),
   }
 })

  const handleDelete = async (e, data) => {
      console.log("delete",data)
    // setLoading(true)
    // try {
    //   const res = await deleteVendor(data.id);
    //   console.log("After delete", res);
    //   setLoading(false)
    // }catch (e) {
    //   console.log("Delete Vendor" , e)
    // }finally {
    //   setLoading(false)
    // }
    // const vendors = vendorList.filter(item => item._id !== data.id);
    // setVendorList(vendors)
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

    // const data = [
    //     { sno: 1, name: 'Apple Juice', type: 'juice', price: '120', action: '', active: '' },
    //     { sno: 2, name: 'Bean Juice', type: 'juice', price: '220', action: '', active: '' },
    //     { sno: 3, name: 'Light Speed Yellow Paint', type: 'paint', price: '320', action: '', active: '' }
    // ];

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
            name: 'Org Name',
            selector: 'organisation_name',
            sortable: true,
        },
        {
          name: 'Org Category',
          selector: 'organisation_cat',
          sortable: true,
        },
        {
          name: 'Org Location',
          selector: 'organisation_location',
          sortable: true,
        },
      {
        name: 'Operational Area',
        selector: 'organisation_area',
        sortable: true,
      },
        {
            name: 'Action',
            selector: 'action',
            sortable: false,
            cell: row => <div>
                <Link className='simple-edit-btn' to={{
                    pathname: 'javascript:;',
                    state: {
                        id: row.id
                    }
                }}>Edit</Link>
                {/* <Link className='delete-btn' > Delete</Link> */}
                <Link className='delete-action' onClick={(e) => {handleDelete(e,row)}}>Delete</Link>
                <Link className='view-btn' to={{
                    pathname: 'javascript:;',
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
    return (
        <div className='zmp-user-page'>
            {loading && <Loader />}
          {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <div className="search-outer">
                <input name="" className="search-box" placeholder="Search Merchant name or Phone or Email" type="text" onChange={(e) => setSearchName(e.target.value)} /><input className="search" value="" type="submit" onClick={handleSearch} />
            </div>
            {/*<ExportCSV csvData={data} fileName={"Vendor List"} />*/}

            {/* <Popup error={true} message="Something went wrong error 505"/> */}
            <DataTable
                title="All Merchant"
                data={tableData}
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
            <AddBtn to="/vendor/vendor-create" />
        </div>
    );
}
export default ListVendor;

