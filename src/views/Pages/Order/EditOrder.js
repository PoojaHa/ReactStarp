import React, {useEffect, useState} from 'react'
import { Input } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import { getUserList,getOrderList,updateOrder} from '../../../redux/api';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import states from "../../../assets/state.json";
import { resetWarningCache } from 'prop-types';

const CreateOrder =(props) => {
  const [pickupAddress, setPickupAddress] = useState(null);
  const [pickupPincode, setPickupPincode] = useState(null)
  const [pickupState, setPickupState] = useState(null)
  const [dropAddress, setDropAddress] = useState(null);
  const [dropPincode, setDropPincode] = useState(null)
  const [dropState, setDropState] = useState(null)
  const [flatType, setFlatType] = useState(null)
  const [userId, setUserId]= useState(null)
  const [userList, setUserList] = useState(null)
  const [orderList,setOrderList]=useState(null)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [formatFromDate, setFormatFromDate] = useState(null)
  const [formatToDate, setFormatToDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('')
  
  const orderId = props.location.state && props.location.state.id
  console.log(orderId)

  useEffect(()=> {
    getUserData()
   getOrderData();
  },[])

  const getOrderData = async ()=>{
      setLoading(true)
      try{
          const res= await getOrderList();
          //console.log('poojares',res)
          const orderDetail = res && res.data.data.orders.filter((item) => item._id === orderId.toString())[0];
          setUserId(orderDetail.bookedBy._id);
          setPickupAddress(orderDetail.pickup.address);
          setPickupState(orderDetail.pickup.state);
          setDropAddress(orderDetail.drop.address);
          setDropState(orderDetail.drop.state);
          setDropPincode(orderDetail.drop.pinCode);
          setPickupPincode(orderDetail.pickup.pinCode);
          setFlatType(orderDetail.configration.flatType);
          setFromDate(orderDetail.timeline.fromDate);
          setToDate(orderDetail.timeline.toDate);
          console.log(orderDetail,'res');
        //   setOrderList(orderDetail)
          setLoading(false);
      }catch(e){
       console.log('error in Order',e)
       setError(true);
       setErrMsg('something went wrong');
      }finally{
       setLoading(false)
      }
  }

  const getUserData= async () => {
    try {
      const res = await getUserList();
      //console.log('userdata',res)
      setUserList(res && res.data.data.users)
      setLoading(false)
    }catch (e) {
      console.log("Error User" , e)
      setError(true);
      setErrMsg('Something went wrong')
    }finally {
      setLoading(false)
    }
  }

  const userName = userList && userList.map((item, index) => {
   return <option key={item.name+ index} value={item._id}>{item.name}</option>
  });

  const handleSubmit= async (e)=>{
    try{
      setLoading(true)
      e.preventDefault();
      console.log("start date", formatFromDate, formatToDate)
      const data = {
        pickupState,
        pickupAddress,
        pickupPincode,
        dropState,
        dropAddress,
        dropPincode,
        flatType: flatType.toLowerCase(),
        fromDate: fromDate,
        toDate: toDate,
        orderId
      }
      //console.log(data)
      const res = await updateOrder(data);
      console.log('updateorder',res);
      setLoading(false)
      setError(false)
      setSucessMsg('Order updated successfully')
      setSucess(true)
      // await updateTrackingStatus(orderId, data);
      await getOrderData();
    }catch(error){
      console.log(error)
      setErrMsg(error.message);
      setLoading(false)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()+1
    const year = new Date(date).getFullYear()
    return day+'/'+month+'/'+year
  }
  const handleFromDate = (v,f) => {
    console.log("from date",v,f)
    const d = formatDate(v)
    setFormatFromDate(d)
    setFromDate(v)
  }

  const handleToDate = (v,f) => {
    console.log("to date",v,f)
    const d = formatDate(v)
    setFormatToDate(d)
    setToDate(v)
  }

  const options = Object.keys(states).map(k => ({id: k, name:states[k]}));
  const statesOptions = options.map((item)=> <option key={item.id} value={item.name}>{item.name}</option>)
  const flatTypeList = [
      {key: '1bhk', value: '1BHK'},
      {key: '2bhk', value: '2BHK'},
      {key: 'other', value: 'OTHER'}
  ];
  const renderFlatType = flatTypeList.map((flat, index) => <option key={flat.key+ index} value={flat.key}>{flat.value}</option>);

  return(
    <div className="whiteBox" style={{ marginBottom: 20 }}>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <h4 className="title-heading" >Update Order</h4>
      <form>
        <div className="form-element">
          <label >User Id</label>
          <select id="user-dropdown" className="form-control"  value={userId} onChange={(e) => {
            setUserId(e.target.value)
          }}>
            <option value={null} selected disabled={true}>Select User</option>
            {userName}
          </select>
        </div>
        <div className="form-element">
          <label >Pickup Address</label>
          <Input type="text" placeholder="Enter Pickup Address" value={pickupAddress} autoComplete="name" onChange={(e) => setPickupAddress(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Pickup Pincode</label>
          <Input type="text" placeholder="Enter Pickup Pincode" value={pickupPincode} autoComplete="name" onChange={(e) => setPickupPincode(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Pickup State</label>
          <select className="form-control" value={pickupState} onChange={(e) => setPickupState(e.target.value)}>
            <option selected={true} disabled={true} hidden>Select Pickup State</option>
            {statesOptions}
          </select>
        </div>

        <div className="form-element">
          <label >Drop Address</label>
          <Input type="text" placeholder="Enter Drop Address" value={dropAddress} autoComplete="name" onChange={(e) => setDropAddress(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Drop Pincode</label>
          <Input type="text" placeholder="Enter Drop Pincode" value={dropPincode} autoComplete="name" onChange={(e) => setDropPincode(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Drop State</label>
          <select className="form-control" value={dropState} onChange={(e) => setDropState(e.target.value)}>
            <option hidden selected={true} disabled={true}>Select Drop State</option>
            {statesOptions}
          </select>
        </div>
        <div className="form-element">
          <label htmlFor="exampleSelect">Flat Type</label>
          <select id="dropdown" className="form-control" value={flatType} onChange={(e) => {
            setFlatType(e.target.value)
          }}>
            <option value={null} selected hidden>Select Type</option>
            {renderFlatType}
          </select>
        </div>
        <div className="form-element">
          <label >From Date</label>
          <DatePicker
            id = "fromDate"
            value={fromDate}
            dateFormat="DD MM YYYY"
            onChange= {(v,f) => { handleFromDate(v,f)}}
          
          />
        </div>
        <div className="form-element">
          <label >To Date</label>
          <DatePicker
            id = "toDate"
            dateFormat="DD MM YYYY"
            value={toDate}
            onChange= {(v,f) => handleToDate(v,f)}
        
          />
        </div>
        <div className="submit-wrap">
          <button className="common-btn" type="submit" size="sm" onClick={handleSubmit} color="primary">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default CreateOrder;
