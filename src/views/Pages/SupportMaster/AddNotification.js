import React, { useState,useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import AddBtn from '../../../components/AddBtn';
import { Link } from 'react-router-dom';
import {cabretApi} from '../../../redux/api'
const AddNotification = () => {
    let [modal, setModal] = useState(false);
    let [modalDelete, setModalDelete] = useState(false);
    let [modalAdd, setModalAdd] = useState(false);
    let [notificationData,setNotificationData]=useState([])
    let [text,setText] =useState('')
    let [notId,setNotId]=useState(null)
    let [count,setCount]=useState(0)
    useEffect(()=>{
        cabretApi.get('/api/notification').then(res=>{
            console.log(res)
            setNotificationData(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[count])
    console.log(notificationData)
    const data = notificationData && notificationData.map((item,index)=>{
    return{
        sno:index+1,
        id:item._id,
        event:item.event ? item.event :'NA',
        subject: item.text ? item.text :'NA',
        to:item.to? item.to:'NA'
    }
    })
    const dataI = [
        { id: 1, event: 'Sign Up', subject: 'Congratulations ! You joined as a Zoogol Micro Partner, Congratulations -- Thanks Congratulations ! You joined as a Zoogol Micro Partner, Congratulations -- Thanks Congratulations ! You joined as a Zoogol Micro Partner, Congratulations -- Thanks',},
        { id: 2, event: 'Online Purchase', subject: '1982'},
    ];
    const columns = [
        {
            name: 'S.No',
            selector: 'sno',
            sortable: true,
            maxWidth: '70px',
            Left: true,
        },
        {
            name: 'Event',
            selector: 'event',
            sortable: true,
            maxWidth: '250px',
        },
        {
            name: 'Subject',
            selector: 'subject',
            sortable: true,
            wrap: true,
        },
        {
            name: 'To',
            selector: 'to',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Action',
            selector: 'action',
            sortable: false,
            maxWidth: '150px',
            cell: row => <div>
                {/* <button className='view-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</button> */}
                <Link className='simple-edit-btn' onClick={(e) => { updateVideo(e, row.id) }}>Edit</Link>
                {/* <Link className='delete-action' style={{ marginLeft: 10 }} onClick={(e) => { setModalDelete(e, row.id) }}>Delete</Link> */}
                {/* <Link className='view-btn' to={{
                    pathname: '/zmp-master/zmpUser-detail',
                    state: {
                        id: row.id
                    }
                }}>View</Link> */}
            </div>
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

    const updateVideo = (e,id) => {
        setNotId(id)
        setModal(!modal);
    }
    const handleUpdate = () => {
        let data={
            text
        }
        cabretApi.put(`/api/notification/${notId}`,data).then(res=>{
            console.log(res)
            alert('Message Updated Sucessfully')
            setCount(count+1)
        }).catch(err=>{
            console.log(err)
        })
        setModal(!modal);
    }
    const deleteModal = () => {
        setModalDelete(!modalDelete);
    }
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
            expandableRows= {false}
            // expandableRowsComponent= 'state'
            //theme="solarized"
            />
            {/* <AddBtn onClick={addVideo} /> */}
            <Modal isOpen={modal} toggle={updateVideo}>
                <ModalHeader toggle={updateVideo}>Edit Notifcation</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Subject</label>
                            <input type="text" className="form-control" onChange={(e)=>setText(e.target.value)}/>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                    <Button color="secondary" onClick={updateVideo}>Cancel</Button>
                </ModalFooter>
            </Modal>

{/* 
            <Modal isOpen={modalAdd} toggle={addVideo}>
                <ModalHeader toggle={addVideo}>Add Video</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Thumbnail</label>
                            <input type="file" className="form-control" />
                        </div>
                        <div className="form-element">
                            <label>Title</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-element">
                            <label>URL</label>
                            <input type="text" className="form-control" />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addVideo}>Add</Button>{' '}
                    <Button color="secondary" onClick={addVideo}>Cancel</Button>
                </ModalFooter>
            </Modal> */}

            {/* <Modal isOpen={modalDelete} toggle={deleteModal}>
                <ModalHeader toggle={deleteModal}>Delete</ModalHeader>
                <ModalBody>
                    <p>Are you sure, you want to Delete ?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteModal}>Delete</Button>{' '}
                    <Button color="secondary" onClick={deleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal> */}
        </div>

    )
}
export default AddNotification