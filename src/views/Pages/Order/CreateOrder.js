import React, {useEffect, useState} from 'react'
import { Input } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import {createOrder, getUserList} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import states from "../../../assets/state.json";
import { useHistory } from 'react-router-dom';

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
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [formatFromDate, setFormatFromDate] = useState(null)
  const [formatToDate, setFormatToDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('')
  const history = useHistory();

  useEffect(()=> {
    getUserData()
  },[])

  const getUserData= async () => {
    try {
      const res = await getUserList();
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
      console.log("start date", formatFromDate, fromDate)
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
        bookedBy: userId,
      }
      await createOrder(data);
      setLoading(false)
      setError(false)
      setSucessMsg('Order created successfully')
      setSucess(true);
      setTimeout(()=> {
        history.push('/orders')
      }, 2000);
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
  const flatTypeList = ['1BHK','2BHK', '3BHK', 'OTHER'];
  const renderFlatType = flatTypeList.map((type, index) => <option key={type+ index} value={type}>{type}</option>);

  return(
    <div className="whiteBox" style={{ marginBottom: 20 }}>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <h4 className="title-heading">Create Order</h4>
      <form>
        <div className="form-element">
          <label >User Id</label>
          <select id="user-dropdown" className="form-control"  onChange={(e) => {
            setUserId(e.target.value)
          }}>
            <option value={null} selected disabled={true}>Select User</option>
            {userName}
          </select>
        </div>
        <div className="form-element">
          <label >Pickup Address</label>
          <Input type="text" placeholder="Enter Pickup Address" autoComplete="name" onChange={(e) => setPickupAddress(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Pickup Pincode</label>
          <Input type="text" placeholder="Enter Pickup Pincode" autoComplete="name" onChange={(e) => setPickupPincode(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Pickup State</label>
          <select className="form-control" onChange={(e) => setPickupState(e.target.value)}>
            <option selected={true} disabled={true} hidden>Select Pickup State</option>
            {statesOptions}
          </select>
        </div>

        <div className="form-element">
          <label >Drop Address</label>
          <Input type="text" placeholder="Enter Drop Address" autoComplete="name" onChange={(e) => setDropAddress(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Drop Pincode</label>
          <Input type="text" placeholder="Enter Drop Pincode" autoComplete="name" onChange={(e) => setDropPincode(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Drop State</label>
          <select className="form-control" onChange={(e) => setDropState(e.target.value)}>
            <option hidden selected={true} disabled={true}>Select Drop State</option>
            {statesOptions}
          </select>
        </div>
        <div className="form-element">
          <label htmlFor="exampleSelect">Flat Type</label>
          <select id="dropdown" className="form-control" onChange={(e) => {
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
          <button className="common-btn" type="submit" size="sm" color="primary" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default CreateOrder;
