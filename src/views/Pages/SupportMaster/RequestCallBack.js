import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import {cabretApi} from '../../../redux/api'
const RequestCallBack = (props) => {
    const [data, setData] = useState([]);
    const [callData,setCallData] =useState(null)
    const [requestNumber,setRequestNumber]=useState(null)
    const [newRequest,setNewRequest] = useState(0)
    const [openRequest, setOpenRequest] = useState(0)
    const [solveRequest, setSolveRequest] = useState(0)
    const [holdRequest, setHoldRequest] = useState(0)
    const [reOpenRequest, setReOpenRequest] = useState(0)
    const [update,setUpdate]=useState(true)
    const [count,setCount] = useState(0)
    useEffect(() => {
        cabretApi.get('/api/feedback/feedbackType/Callback').then(res=>{
            console.log(res)
            setCallData(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
        // setData(dataInput)
    }, [count])
    useEffect(() => {
        cabretApi.get('/api/feedback/feedback-number/Callback').then(res => {
            console.log(res)
            setRequestNumber(res.data.data)
        }).catch(err => {
            console.log(err)
        })
        // setData(dataInput)
    }, [count])
    const HandleChange = (value, id) => {
        console.log("Value ==> ", value, id)
        let dataInput = {
            status: value
        }
        let data = JSON.stringify(dataInput)
        cabretApi.put(`/api/feedback/${id}`, data, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setCount(count + 1)
        }).catch(err => {
            console.log(err)
        })
        const newData = callData.map((el) => el._id === id ? { ...el, status: value } : el)
        setCallData(newData);
    }
     requestNumber && update < requestNumber.length && requestNumber.map(item=>{
        if(item._id==null)
         setNewRequest(item.count)
       else if (item._id == 'Reopen')
            setReOpenRequest(item.count)
       else if (item._id == 'Solved')
            setSolveRequest(item.count)
        else if (item._id == 'Not Solved')
            setOpenRequest(item.count)
       else if (item._id == 'Hold')
            setHoldRequest(item.count)
           setUpdate(update+1) 
    })
    const selectColor = (status) => {
        console.log("Status", status);
        if (status == "Reopen") {
            return { color: '#2DADD9' }
        }
        else if (status == "Solved") {
            return { color: '#339A6A' }
        }
        else if (status == 'Not Solved') {
            return { color: '#D92D2D' }
        }
        else {
            return { color: '#D9722D' }
        }
    }
    // const dataInput = callData ? callData.map((item,index)=>{
    //     return{
    //         sno:index+1,
    //         id: item._id ? item._id :'123',
    //         date: item.createdAt ? item.createdAt.split('T')[0] :'NA',
    //         name: item.name ? item.name : item.userId && item.userId.fullname ? item.userId.fullname :'NA',
    //         email: item.email ? item.email :item.userId && item.userId.email ? item.userId.email :'NA',
    //         contact: item.phone ? item.phone : item.userId && item.userId.phone ? item.userId.phone:'NA',
    //         time:item.time ? item.time :"NA",
    //         status:item.status?item.status :'Select Status',
    //     }
    // }): [];
    const dataCallback = [
        { sno: 1, date: '24-07-2020 10:30 A.M.', name: 'Partner Name', email: 'partneremialid@gmail.com', contact: '1234567890', time: 'Morning 09:00 - 12:00 PM', status: 'reopen' },
        { sno: 2, date: '24-07-2020 10:30 A.M.', name: 'Partner Name', email: 'partneremialid@gmail.com', contact: '1234567890', time: 'Morning 09:00 - 12:00 PM', status: 'reopen' },
    ];
    // console.log("data==>", data)
    const columnsCallback = [
        {
            name: 'S.No',
            selector: 'sno',
            sortable: true,
            maxWidth: '70px',
            Left: true,
        },
        {
            name: 'Date of Query',
            selector: 'date',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Contact No.',
            selector: 'contact',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Selected Time of Callback',
            selector: 'time',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Status',
            selector: 'status',
            cell: row => <select onChange={(e) => HandleChange(e.target.value, row.id)} value={row.status} style={selectColor(row.status)}>
                <option value="New Status" selected hidden>Select Status</option>
                <option value="Solved">Solved</option>
                <option value="Hold">On Hold</option>
                <option value="Not Solved">Not Solved</option>
                <option value="Reopen">Reopen</option>
            </select>,
            sortable: true,
            wrap: true,
        },
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
    return(
        <>
        <div className="top-tab-bar">
            <div className="left-section">
                <Link className="csvExport">Export to CSV</Link>
            </div>
            <div className="right-section">
                <div className="newrequest">
                    <span>New Request : </span>
    <span className="value">{newRequest}</span>
                </div>
                <div className="openrequest">
                    <span>Open Request : </span>
    <span className="value">{openRequest}</span>
                </div>
                <div className="solverequest">
                    <span>Solve Request : </span>
    <span className="value">{solveRequest}</span>
                </div>
                <div className="holdrequest">
                    <span>Hold Request : </span>
    <span className="value">{holdRequest}</span>
                </div>
                <div className="reopenrequest">
                    <span>Reopen Request : </span>
    <span className="value">{reOpenRequest}</span>
                </div>
            </div> 
        </div> 
        <DataTable
                data={dataCallback}
            columns={columnsCallback}
            pagination={true}
            paginationPerPage={10}
            customStyles={customStyles}
            theme="solarized"
        />
        </>
    )
}

export default RequestCallBack;