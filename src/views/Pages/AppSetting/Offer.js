import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import AddBtn from '../../../components/AddBtn';
import { Link } from 'react-router-dom';
import { cabretApi } from '../../../redux/api'
import * as formData from 'form-data';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const Offer = () => {
    let [modal, setModal] = useState(false);
    let [modalDelete, setModalDelete] = useState(false);
    let [modalAdd, setModalAdd] = useState(false);
    const [offerImage, setOfferImage] = useState('')
    const [expiryDate, setExpiryDate] = useState(null)
    const [maxDiscount, setMaxDiscount] = useState(null)
    const [discountPercent, setDiscountPercent] = useState(null);
    const [minOrder,setMinOrder] = useState(null);
    const [slot,setSlot] = useState(null)
    const [couponCode,setCouponCode] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    const [offerData,setOfferData] = useState(null)

    useEffect(() => {
        fetchOffer()
    }, [modal, modalAdd, modalDelete])
    const fetchOffer = () => {
        cabretApi.get('/api/offer').then(res => {
            if (res.data.data) {
                setOfferData(res.data.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const data = offerData && offerData.length>0 ?  offerData.map((item, index) => {
        return {
            id: item._id ? item._id : 'NA',
            sno: index + 1,
            code: item.couponCode ? item.couponCode : 'NA',
            percent: item.discountPercent ? item.discountPercent : 0,
            expiry: item.expiresIn? item.expiresIn.slice(0,10) :"NA",
            maxDisc: item.maxDiscount ? item.maxDiscount:0,
            minOrder:item.minOrder ? item.minOrder :0,
            slot: item.slots ? item.slots : 0,
            src: item.imageUrl ? item.imageUrl : require('../../../assets/img/proof.png')
        }
    }):[]
    const dataInput = [
        {
            id: 1, title: 'abcd', url: 'https://www.google.com', src: require('../../../assets/img/proof.png')
},
        {
            id: 2, title: 'Conan the Barbarian', url: 'https://www.google.com', src: require('../../../assets/img/proof.png')
 },
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
            name: 'offerImage',
            maxWidth: '150px',
            cell: row => <img className="VideoThumb" src={row.src} />
        },
        {
            name: 'Coupon Code',
            selector: 'code',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Discount %',
            selector: 'percent',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Expiry',
            selector: 'expiry',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Max Discount',
            selector: 'maxDisc',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Min Order',
            selector: 'minOrder',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Slot',
            selector: 'slot',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Action',
            selector: 'action',
            sortable: false,
            cell: row => <div>
                {/* <button className='view-btn' onClick={(e) => { handleDelete(e, row.id) }}>Delete</button> */}
                <Link className='view-btn' onClick={(e) => { setCouponCode(row.code); setDiscountPercent(row.percent);setExpiryDate( row.expiry);setMinOrder(row.minOrder);setMaxDiscount(row.maxDisc);setSlot(row.slot); setModal(row) }}>Update</Link>
                <Link className='delete-action' style={{ marginLeft: 10 }} onClick={(e) => { setModalDelete(row) }}>Delete</Link>
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

    const updateNewOffer = (props) => {
        setLoading(true)
        let data={
            expiresIn: expiryDate,
            discountPercent: Number(discountPercent),
            maxDiscount: Number(maxDiscount),
            minOrder: Number(minOrder),
            slots: Number(slot),
            couponCode,
        }

        // dataBody.append('offerImage', offerImage)
        // if (offerImage != null) {
        //     dataBody.append('images', offerImage)
        // }

        cabretApi.put(`/api/offer/${modal.id}`, data).then(res => {
            setLoading(false)
            setError(false)
            setSucessMsg('Offer updated successfully')
            setSucess(true)
            fetchOffer()
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
        setModal(!modal);
    }

    const updateVideo = () => {
        setModal(!modal);
    }

    const addNewOffer = () => {
        setLoading(true)
        const dataBody = new formData();
        dataBody.append('expiresIn', expiryDate)
        dataBody.append('discountPercent', Number(discountPercent))
        dataBody.append('maxDiscount', Number(maxDiscount))
        dataBody.append('minOrder', Number(minOrder))
        dataBody.append('slots',Number(slot))
        dataBody.append('couponCode', couponCode)
        dataBody.append('offerImage', offerImage)
        cabretApi.post('/api/offer', dataBody).then(res => {
            setLoading(false)
            setError(false)
            setSucessMsg('Offer created successfully')
            setSucess(true)
            fetchOffer()
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)        })
        setModalAdd(!modalAdd);
    }
    const addVideo = () => {
        setModalAdd(!modalAdd);
    }
    const deleteModal = () => {
        setModalDelete(!modalDelete);
    }
    const deleteOffer = () => {
        cabretApi.delete(`/api/offer/${modalDelete.id}`).then(res => {
            fetchOffer()
            setLoading(false)
            setError(false)
            setSucessMsg('Offer Deleted sucessfully')
            setSucess(true)
            setTimeout(() => {setSucess(false) }, 1000)
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)        })
        setModalDelete(!modalDelete);
    }
    return (
        <div className="whiteBox editVideos">
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <DataTable
                title="All Offer"
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
                <ModalHeader toggle={updateVideo}>Update Offer</ModalHeader>
                <ModalBody>
                    <form>
                        {/* <div className="form-element">
                            <label>Offer Image</label>
                            <input type="file" id='file'  placeholder="Offer Image"
                            accept="Image/*" className="form-control" value={offerImage} onChange={(e) => setOfferImage(e.target.files[0])} />

                            <input className="form-control" type="file" autoComplete="image" onChange={e => {  console.log(e.target.files[0]) }} />

                            {offerImage && <img src={URL.createObjectURL(offerImage)} alt="upload" style={{ width: 300, hight: 300 }} />}
                        </div> */}
                        <div className="form-element">
                            <label>Expiry Date</label>
                            <input type="date" placeholder="Expiry date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Discount Percent</label>
                            <input type="number" placeholder="Discount percent" className="form-control" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Minimum Order Amount</label>
                            <input type="text" placeholder="Minimum order" className="form-control" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Max Discount</label>
                            <input type="text" placeholder="Maximum Discount" className="form-control" value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Slots</label>
                            <input type="text" placeholder="Offer Slots" className="form-control" value={slot} onChange={(e) => setSlot(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Coupon Code</label>
                            <input type="text" placeholder="Coupon Code" className="form-control" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateNewOffer}>Update</Button>{' '}
                    <Button color="secondary" onClick={updateVideo}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalAdd} toggle={addVideo}>
                <ModalHeader toggle={addVideo}>Add Offer</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Offer Image</label>
                            <input type="file" placeholder="Offer Image" className="form-control" onChange={(e) => setOfferImage(e.target.files[0])} />
                        </div>
                        <div className="form-element">
                            <label>Expiry Date</label>
                            <input type="date" placeholder="Expiry date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Discount Percent</label>
                            <input type="number" placeholder="Discount percent" className="form-control" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Minimum Order Amount</label>
                            <input type="text" placeholder="Minimum order" className="form-control" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Max Discount</label>
                            <input type="text" placeholder="Maximum Discount" className="form-control" value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Slots</label>
                            <input type="text" placeholder="Offer Slots" className="form-control" value={slot} onChange={(e) => setSlot(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Coupon Code</label>
                            <input type="text" placeholder="Coupon Code" className="form-control" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addNewOffer}>Add</Button>{' '}
                    <Button color="secondary" onClick={addVideo}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete} toggle={deleteModal}>
                <ModalHeader toggle={deleteModal}>Delete</ModalHeader>
                <ModalBody>
                    <p>Are you sure, you want to Delete ?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteOffer}>Delete</Button>{' '}
                    <Button color="secondary" onClick={deleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}
export default Offer
