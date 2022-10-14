import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Row, Container, Col, Input, Button } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import Loader from '../../../components/Loader';
import { actionOnQuote, createTrackingStatus, getAllQuotes, getOrderList, updateTrackingStatus, updateOrderStatus,createPricedetails } from "../../../redux/api";
import Popup from "../../../components/Popup";
import DatePicker from "reactstrap-date-picker";
import copyImg from '../../../assets/img/copy.png';
import { useMediaQuery } from 'react-responsive'

const ViewOrder = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('')

  const [orderList, setOrderList] = useState(null)
  const [quoteData, setQuoteData] = useState([])
  const [orderStatus, setOrderStatus] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [location, setLocation] = useState(null)
  const [event, setEvent] = useState(null)
  const [note, setNote] = useState(null)
  const [date, setDate] = useState(null)
  const [showprice,setshowPriceform]=useState(false)
  const [tax, setTax] = useState(null)
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [movingCharge,setMovingCharge]=useState(0);
  const [insuranceCharge,setInsuranceCharge]=useState(0)
  const [packagingcharge,setPackagingcharge]=useState(0)
  const[total,setTotal]=useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });


  const orderId = props.location.state && props.location.state.id;

  useEffect(() => {
    getOrderData()
  }, [sucess])

  useEffect(()=> {
    const caculatedTax = (Number(movingCharge || 0) + Number(packagingcharge || 0)+ Number(insuranceCharge || 0)) * (Number(taxPercentage || 0)/100);
    setTax(caculatedTax);
  },[movingCharge, insuranceCharge, packagingcharge, taxPercentage]);

  useEffect(()=> {
    const calculateTotal = (Number(movingCharge || 0) + Number(packagingcharge || 0)+ Number(insuranceCharge || 0)) + Number(tax || 0);
    setTotal(calculateTotal);
  },[movingCharge, insuranceCharge, packagingcharge, taxPercentage, tax]);


  const getOrderData = async () => {
    setLoading(true)
    try {
      const res = await getOrderList();
      const orderDetail = res && res.data.data.orders.filter((item) => item._id === orderId.toString())[0]
      setOrderList(orderDetail);
      const quotes = await getAllQuotes(orderId);
      setQuoteData(quotes.data.data.quotes);
      console.log('quotes', quotes);
      setOrderStatus(orderDetail.status)
      setLoading(false)
    } catch (e) {
      console.log("Error User", e)
      setError(true);
      setErrMsg('Something went wrong')
    } finally {
      setLoading(false)
    }
  }


  const formattedDate = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    return day + '/' + month + '/' + year
  }

  const formatDateandTime = (date) => {
    //2022-06-13T04:54
    if(date && date.includes('T')){
      const [dateStr, timeStr] = date.split('T');
      const [hour, minute] = timeStr.split(':');
      const hourInNumber = Number(hour);
      let formattedHour;
      let AM = true;
      if(hourInNumber == 0){
        formattedHour = '01';
        AM = true;
      } else if(hourInNumber > 12){
        const remainder = Math.floor(hourInNumber % 12);
        if(remainder > 0 && remainder < 10){
          formattedHour = `0${remainder}`
          AM = false
        } else if( remainder >= 10){
          formattedHour = remainder;
          AM = false
        }
      } if(hourInNumber > 0 && hourInNumber < 10){
        formattedHour = `0${hourInNumber}`
      } else if( hourInNumber >= 10 && hourInNumber <=12){
        formattedHour = hourInNumber;
      }
      const formattedTime = `${formattedHour}:${minute}${AM ? 'AM': 'PM'}`;
      const formattedDate = dateStr.split('-').reverse().join('/');
      const value = `${formattedDate} - ${formattedTime}`;
      return value;
    }
  }
  const handleSelectStatus = async (e, row) => {
    setLoading(true)
    const data = {
      status: e
    }
    console.log("row=> ", data)
    try {
      await actionOnQuote(row.id, data)
      setLoading(false)
      window.location.reload();
    } catch (e) {
      console.log("Error", e)
      setError(true);
      setErrMsg('Something went wrong')
    } finally {
      setLoading(false)
    }
  }


  const tableData = quoteData && quoteData.map((item, index) => {
    return {
      sno: index + 1,
      id: item._id || '-',
      quoteId: item._id.slice(-5) || '-',
      moving: item.movingCharge || '-',
      packing: item.packingCharge || '-',
      insurance: item.insuranceCharge || '-',
      total: item.totalCharge || '-',
      negotiable: item.isNegotiable.toString() || '-',
      status: item.status
    }
  })
  const columns = [
    {
      name: 'S.No',
      selector: 'sno',
      sortable: true,
    },
    {
      name: 'Quote Id',
      selector: 'quoteId',
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
      name: 'Moving Charge',
      selector: 'moving',
      sortable: true,
    },
    {
      name: 'Packing Charge',
      selector: 'packing',
      sortable: true,
    },
    {
      name: 'Insurance Charge',
      selector: 'insurance',
      sortable: true,
    },
    {
      name: 'total Charge',
      selector: 'total',
      sortable: true,
    },
    {
      name: 'Negotiable',
      selector: 'negotiable',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'action',
      sortable: false,
      cell: row => <div>
        {
          orderList?.status == 'pending' ?

            <select id="status-dropdown" className="form-control" onChange={(e) => {
              handleSelectStatus(e.target.value, row)
            }}>
              <option value={null} selected hidden>Select Type</option>
              <option value='accepted'>Accept</option>
              <option value='rejected'>Reject</option>
            </select> :
            <p style={{ marginBottom: 0 }}>{row.status == 'accepted'? row.status: 'Offer Close'}</p>
        }
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


  const handleStatusSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const data = {
        orderId,
        event, date, location, note
      }
      await createTrackingStatus(data)
      console.log("data", data);
      setLoading(false)
      setError(false)
      setSucessMsg('Order created successfully')
      setSucess(true);
      // await updateTrackingStatus(orderId, data);
      await getOrderData();
      setLoading(false)
      setError(false)
      setSucessMsg('Status Updated successfully')
      setSucess(true)
      setShowForm(false);
    } catch (error) {
      console.log(error)
      setErrMsg(error.message);
      setLoading(false)
      setError(true)
    } finally {
      setLoading(false)
      setSucess(false);
    }
  }
  const handlePriceSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const data = {
        orderId: orderList?._id,
        movingCharge,
        packingCharge: packagingcharge,
        insuranceCharge,
        taxCharges:tax,
        totalCharge: total,
        isNegotiable: false,
      }
      await createPricedetails(data)
      console.log("Pricedata", data);
      setLoading(false)
      setError(false)
      setSucessMsg('Price created successfully')
      setSucess(true);
      // await updateTrackingStatus(orderId, data)
    } catch (error) {
      console.log(error)
      setErrMsg(error.message);
      setLoading(false)
      setError(true)
    } finally {
      setLoading(false)
      setSucess(false);
    }
  }

  const handleStartDelivery = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const data = {
       status:"intransit"
      }
      console.log("handle start delivery",data,orderId)
      await updateOrderStatus(orderId,data)
      console.log("data", data);
      setLoading(false)
      setError(false)
      setSucessMsg('Order started successfully')
      setSucess(true);
      // await updateTrackingStatus(orderId, data);
      await getOrderData();
      setLoading(false)
      setError(false)
      setSucessMsg('Status Updated successfully')
      setSucess(true)
      setShowForm(false);
    } catch (error) {
      console.log(error)
      setErrMsg(error.message);
      setLoading(false)
      setError(true)
    } finally {
      setLoading(false)
      setSucess(false);
    }
  }

  const handleCompleteOrder = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const data = {
        status: "completed"
      }
      console.log("handle start delivery", data, orderId)
      await updateOrderStatus(orderId, data)
      console.log("data", data);
      setLoading(false)
      setError(false)
      setSucessMsg('Order started successfully')
      setSucess(true);
      // await updateTrackingStatus(orderId, data);
      await getOrderData();
      setLoading(false)
      setError(false)
      setSucessMsg('Status Updated successfully')
      setSucess(true)
      setShowForm(false);
    } catch (error) {
      console.log(error)
      setErrMsg(error.message);
      setLoading(false)
      setError(true)
    } finally {
      setLoading(false)
      setSucess(false);
    }
  }
  const Taxdropdown = [5, 12, 18];
  const renderTaxdropdown = Taxdropdown.map((taxPercentage, index) => <option key={taxPercentage.toString()} value={taxPercentage}>{taxPercentage + '%'}</option>);
  const charges=[100,200,300];
  const renderCharges=charges.map((index,c)=><option key={c+ index} value={c}>{c}</option>);


  const deliveryStops = orderList && orderList.trackingStatus.map((item) => {
    return (
      <li className="service-status" key={item.event}>
        <h6>{item.event}</h6>
        <p>{item.location} </p>
        <p style={{ fontSize: 12, padding: 0 }}><b>Note: </b>{item.note}</p>
        <span>{formatDateandTime(item.date)}</span>
      </li>
    )
  })
  const trackingUrl = `http://tracking.krido.in/#/tracking/${orderList?.trackingId}`;
  const confirmationUrl = `http://tracking.krido.in/#/order-confirmation/${orderList?.trackingId}`
  const copyToClipboard = async (urlToCopy) => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(urlToCopy);
    } else {
      return document.execCommand('copy', true, urlToCopy);
    }
    alert("Copied text: "+ urlToCopy);
  }

  return (
    <div className="zmp-detail-page">
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <div className="col-bx-top">
        <div className="user-details">
          <div className="repeatedrow">
            <h3>Order Details</h3>
            <Container>
              <Row>
                <Col xs="12" md="6">
                  <p className="table-content">
                    <span>Pickup</span>
                    <span>:</span>
                    <span>{orderList?.pickup.state || 'NA'}</span>
                  </p>
                  <p className="table-content">
                    <span> Destination </span>
                    <span>:</span>
                    <span>{orderList?.drop.state || 'NA'}</span>
                  </p>
                  <p className="table-content">
                    <span>Flat type</span>
                    <span>:</span>
                    <span>{orderList?.configration.flatType || 'NA'}</span>
                  </p>
                </Col>
                <Col xs="12" md="6">
                  <p className="table-content">
                    <span>Status</span>
                    <span>:</span>
                    <span>{orderList?.status || 'NA'}</span>
                  </p>
                  <p className="table-content">
                    <span>From Date</span>
                    <span>:</span>
                    <span>{orderList && formattedDate(orderList.timeline.fromDate)}</span>
                  </p>
                  <p className="table-content">
                    <span>To Date</span>
                    <span>:</span>
                    <span>{orderList && formattedDate(orderList.timeline.toDate)}</span>
                  </p>

                </Col>
                <Col xs="12">
                  <p className="table-content" style={{display: 'block'}}>
                    <span style={{paddingRight: 10}}>Tracking Url</span>
                    <span style={{paddingRight: 10}}>:</span>
                    <span><i onClick={()=>copyToClipboard(trackingUrl)}><img src={copyImg} width="16px" height="16px" alt="copy" style={{marginRight: 5, cursor: 'pointer'}}></img></i><a style={{wordBreak: 'break-all'}} target="_blank" href={trackingUrl}>{trackingUrl}</a></span>
                  </p>
                </Col>
                <Col xs="12">
                  <p className="table-content" style={{display: 'block'}}>
                    <span style={{paddingRight: 10}}>Confirmation Url</span>
                    <span style={{paddingRight: 10}}>:</span>
                    <span><i onClick={()=>copyToClipboard(confirmationUrl)}><img src={copyImg} width="16px" height="16px" alt="copy" style={{marginRight: 5, cursor: 'pointer'}}></img></i><a style={{wordBreak: 'break-all'}} target="_blank" href={confirmationUrl}>{confirmationUrl}</a></span>
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <div className="whiteBox" style={{ marginTop: 20 }}>
          <h4 className="title-heading">Quotations</h4>
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
      {orderList?.status =="pending" && (
      !showprice ?
         (<div className="col-bx-top price">
         <Button className="common-btn" type="button" size="md" color="primary" onClick={(e) => { e.preventDefault(); setshowPriceform(true) }} style={{ marginRight: 15 }}>Add Price</Button>
         </div>):
       (<form>
        <div className="whiteBox" style={{ marginTop: 20 }}>
          <h4 className="title-heading">PriceDetails</h4>
          {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
    
               <div className="form-element">
              <label >Moving charge</label>
              <Input type="text" placeholder=" Enter Moving charge" value={movingCharge} autoComplete="name" onChange={(e) => setMovingCharge(e.target.value)}  />
            </div>
            <div className="form-element">
              <label >Packaging charge</label>
              <Input type="text" placeholder=" Enter Packaging charge" autoComplete="name" onChange={(e) => setPackagingcharge(e.target.value)}/>
            </div>
            <div className="form-element">
              <label >Insurance change</label>
              <Input type="text" placeholder=" Enter Insurance change" autoComplete="name" onChange={(e) => setInsuranceCharge(e.target.value)}/>
            </div>
            <div className="form-element">
          <label >Tax</label>
          <span className='tax'>
          <select className="form-control" onChange={(e) => setTaxPercentage(e.target.value)}>
            <option hidden selected={true} disabled={true} >Select Drop State</option>
           {renderTaxdropdown}
          </select>
          <Input type="text" placeholder="total tax" autoComplete="total tax" value={tax} disabled/>
          </span>
        </div>
        <div className="form-element">
              <label >Total Payable</label>
              <Input type="text" placeholder="total payable" autoComplete="total" value={total} disabled/>
            </div>
           
            <div className="submit-wrap">
              <Button className="common-btn" type="cancel" size="md" color="secondary" onClick={(e) => { e.preventDefault(); setshowPriceform(false) }} style={{ marginRight: 15 }}>Cancel</Button>
              <Button className="common-btn" type="button" size="md" color="primary" onClick={handlePriceSubmit}>Submit</Button>
            </div>
            </div>
       </form>)
        )
    }
      
      {(orderStatus=="intransit"||orderStatus=="completed") && (
      <div className="whiteBox" style={{ marginTop: 20 }}>
        <h4 className="title-heading">Order Status Update</h4>
        {!showForm ?
          (<div className="status-full-info">
            <ul>
              <li className="service-started">
                <h4>PICKUP ADDRESS</h4>
                <p>{orderList?.pickup.address}, <b>State:</b> {orderList?.pickup.state}, <b>Pin:</b> {orderList?.pickup.pinCode}</p>
                <span>{orderList && formattedDate(orderList?.timeline.fromDate)}</span>
              </li>
              {deliveryStops}
            </ul>
          { orderStatus=="intransit" && (
            <div className="submit-wrap">
                <Button className="common-btn" type="button" size="md" color="primary" onClick={(e) => { e.preventDefault(); setShowForm(true) }} style={{ marginRight: 15 }}>Add Stop</Button>
                <Button className="common-btn" type="button" size="md" color="primary" onClick={handleCompleteOrder}>Complete Booking</Button>
            </div>)
          }
          </div>) :
          (<form>
            <div className="form-element">
              <label >Event</label>
              <Input type="text" placeholder="Enter Event" autoComplete="name" onChange={(e) => setEvent(e.target.value)} />
            </div>
            <div className="form-element">
              <label >Location</label>
              <Input type="text" placeholder="Enter Location" autoComplete="name" onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="form-element">
              <label >Note</label>
              <Input type="text" placeholder="Enter Note" autoComplete="name" onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className="form-element">
              <label >Date</label>
              <Input type="datetime-local" placeholder="Enter Date" autoComplete="name" onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="submit-wrap">
              <Button className="common-btn" type="button" size="md" color="primary" onClick={handleStatusSubmit}>Submit</Button>
              <Button className="common-btn" type="cancel" size="md" color="secondary" onClick={(e) => { e.preventDefault(); setShowForm(false) }} style={{ marginRight: 15 }}>Cancel</Button>
            </div>
          </form>)
        }

      </div>
      )}
      {orderStatus=="accepted" && (
        <div className="whiteBoxbtn" style={{ marginTop: 20 ,justifyContent:'center'}}>
          {/* <Button className="common-btn" type="cancel" size="sm" color="secondary" onClick={(e) => { e.preventDefault(); setShowForm(false) }} style={{ marginRight: 15 }}>Cancel</Button> */}
          <Button className="common-btn" type="button" size="md" color="primary" onClick={(e)=>handleStartDelivery(e)}>Start Delivery</Button>
        </div>
      )}
    </div>
  )
}

export default ViewOrder;

