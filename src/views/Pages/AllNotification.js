import React, { useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

const AllNotification = () => {

    const data = [
        { id: 1, event: 'Sign Up', subject: 'Congratulations ! You joined as a Zoogol Micro Partner, Congratulations -- Thanks Congratulations ! You joined as a Zoogol Micro Partner, Congratulations -- Thanks Congratulations ! You joined as a Zoogol Micro Partner, Congratulations -- Thanks', },
        { id: 2, event: 'Online Purchase', subject: '1982' },
    ];
    const columns = [
        {
            name: 'S.No',
            selector: 'id',
            sortable: true,
            maxWidth: '70px',
            Left: true,
        },
        {
            name: 'Title',
            selector: 'event',
            sortable: true,
            maxWidth: '250px',
        },
        {
            name: 'Description',
            selector: 'subject',
            sortable: true,
            wrap: true,
        },

    ];
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
        <div className="whiteBox editVideos">
            <DataTable
                title="All Notifications"
                data={data}
                // selectableRows                
                columns={columns}
                pagination={true}
                paginationPerPage={10}
                customStyles={customStyles}
                theme="solarized"
                expandableRows={false}
            // expandableRowsComponent= 'state'
            //theme="solarized"
            />
        </div>

    )
}
export default AllNotification