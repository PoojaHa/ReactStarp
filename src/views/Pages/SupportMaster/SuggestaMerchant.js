import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import { cabretApi } from '../../../redux/api'
import moment from 'moment'

const SuggestaMerchant = (props) => {
    const [suggestionData, setSuggestionData] = useState([])
    useEffect(() => {
        cabretApi.get('/api/suggest-merchant').then(res => {
            console.log(res)
            setSuggestionData(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const data = suggestionData && suggestionData.map((item, index) => {
        return {
            sno: index + 1,
            id: item._id,
            date: item.createdAt ? moment(item.createdAt).format('LLL') : 'NA',
            name: item.companyName ? item.companyName : 'NA',
            type: item.businessType ? item.businessType : 'NA',
            person: item.contactPerson ? item.contactPerson : 'NA',
            contact: item.phone ? item.phone : 'NA',
            address: item.address ? item.address : 'NA',
            city: item.city ? item.city : 'NA',
            state: item.state ? item.state : 'NA',
            email: item.email ? item.email : 'NA'
        }
    })
    const dataInput = [
        { sno: 1, data: '24-07-2020 10:30 A.M.', name: 'Company/Store Name', type: 'Trader', person: 'Contact Person', contact: '1234567890', address: 'Address of Business',city: 'City', state: 'State', email: 'partneremialid@gmail.com', deal: 'Content' },
        { sno: 2, data: '24-07-2020 10:30 A.M.', name: 'Company/Store Name', type: 'Retailer', person: 'Contact Person', contact: '1234567890', address: 'Address of Business', city: 'City', state: 'State', email: 'partneremialid@gmail.com', deal: 'Content' },
        
    ];
    // console.log("data==>", data)
    const columns = [
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
            name: 'Comp/Store Name',
            selector: 'name',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Type',
            selector: 'type',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Contact Person',
            selector: 'person',
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
            name: 'Address',
            selector: 'address',
            sortable: true,
            wrap: true,
        },
        {
            name: 'City',
            selector: 'city',
            sortable: true,
            wrap: true,
        },
        {
            name: 'State',
            selector: 'state',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Email',
            selector: 'email',
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
        </div>
        <DataTable
            data={data}
            columns={columns}
            pagination={true}
            paginationPerPage={10}
            customStyles={customStyles}
            theme="solarized"
        />
        </>
    )
}

export default SuggestaMerchant;