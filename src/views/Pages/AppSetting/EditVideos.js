import React,{ useState,useEffect} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import AddBtn from '../../../components/AddBtn';
import {Link} from 'react-router-dom';
import {cabretApi} from '../../../redux/api'
import * as formData from 'form-data';

const EditVideos = () => {
    let [modal, setModal] = useState(false);
    let [modalDelete, setModalDelete] = useState(false);
    let [modalAdd, setModalAdd] = useState(false);
    const [thumbnail,setThumbnail]=useState(null)
    const [title,setTitle] =useState(null)
    const [url,setUrl]=useState(null)
    const [videoData,setVideoData]=useState([])
     useEffect(()=>{
        fetchVideo()
     },[modal,modalAdd,modalDelete])
     const fetchVideo=()=>{
         cabretApi.get('/api/video').then(res => {
             console.log(res)
             if (res.data.data) {
                 setVideoData(res.data.data)
             }
         }).catch(err => {
             console.log(err)
         })
     }
     const data= videoData && videoData.map((item,index)=>{
         return{
             id: item._id ?item._id:'NA',
             sno:index+1,
             title: item.title ? item.title :'NA',
             url: item.url ? item.url :'NA',
             src: item.imageUrl ? item.imageUrl : require('../../../assets/img/proof.png')
         }
     })
    const columns = [
        {
            name: 'S.No',
            selector: 'sno',
            sortable: true,
            maxWidth: '70px',
            Left: true,
        },
        {
            name: 'Thumbnail',
            maxWidth: '150px',
            cell: row => <img className="VideoThumb" src={row.src} />
        },
        {
            name: 'Name',
            selector: 'title',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Url',
            selector: 'url',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Action',
            selector: 'action',
            sortable: false,
            cell: row => <div>
                {/* <button className='view-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</button> */}
                <Link className='view-btn' onClick={(e) => {  setTitle(row.title); setUrl(row.url);setModal( row) }}>Update</Link>
                <Link className='delete-action' style={{marginLeft: 10}} onClick={(e) => { setModalDelete(row) }}>Delete</Link>
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

    const updateNewVideo = (props) => {

        const dataBody = new formData();
        dataBody.append('title', title)
        dataBody.append('url', url)
        if(thumbnail!=null)
        {
            dataBody.append('images', thumbnail)
        }

        cabretApi.put(`/api/video/${modal.id}`, dataBody).then(res => {
            fetchVideo()
            alert('Video uploaded sucessfully')
        }).catch(err => {
            console.log(err)
        })
        setModal(!modal);
    }
    const updateVideo = () => {
        setModal(!modal);
    }
    const addNewVideo = () => {
        const dataBody = new formData();
        dataBody.append('title',title)
        dataBody.append('url', url)
        dataBody.append('videos',thumbnail)
        cabretApi.post('/api/video',dataBody).then(res=>{
            fetchVideo()
            alert('Video uploaded sucessfully')
        }).catch(err=>{
            console.log(err)
        })
        setModalAdd(!modalAdd);
    }
    const addVideo = () => {
        setModalAdd(!modalAdd);
    }
    const deleteModal = () => {
         console.log(modal)
        setModalDelete(!modalDelete);
    }
    const deleteVideo= () => {
        cabretApi.delete(`/api/video/${modalDelete.id}`).then(res=>{
            fetchVideo()
            alert('Video Deleted sucessfully')
        }).catch(err=>{
            console.log(err)
        })
        setModalDelete(!modalDelete);
    }
    return (
        <div className="whiteBox editVideos">
            <DataTable
                title="All Videos"
                data={data}
                // selectableRows
                columns={columns}
                pagination={true}
                paginationPerPage={10}
                customStyles={customStyles}
                theme="solarized"
            // expandableRows= {true}
            // expandableRowsComponent= 'state'
            //theme="solarized"
            />
            <AddBtn onClick={addVideo} />
            <Modal isOpen={modal} toggle={updateVideo}>
                <ModalHeader toggle={updateVideo}>Update Video</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Thumbnail</label>
                            <input type="file" className="form-control" value={thumbnail} onChange={(e)=>setThumbnail(e.target.files[0])}/>
                        </div>
                        <div className="form-element">
                            <label>Title</label>
                            <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div className="form-element">
                            <label>URL</label>
                            <input type="text" className="form-control" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateNewVideo}>Update</Button>{' '}
                    <Button color="secondary" onClick={updateVideo}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalAdd} toggle={addVideo}>
                <ModalHeader toggle={addVideo}>Add Video</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Thumbnail</label>
                            <input type="file" className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} />
                        </div>
                        <div className="form-element">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>URL</label>
                            <input type="text" className="form-control" onChange={(e) => setUrl(e.target.value)} />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addNewVideo}>Add</Button>{' '}
                    <Button color="secondary" onClick={addVideo}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete} toggle={deleteModal}>
                <ModalHeader toggle={deleteModal}>Delete</ModalHeader>
                <ModalBody>
                    <p>Are you sure, you want to Delete ?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteVideo}>Delete</Button>{' '}
                    <Button color="secondary" onClick={deleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}
export default EditVideos
