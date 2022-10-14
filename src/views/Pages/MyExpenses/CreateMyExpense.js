import React, {useEffect, useState} from 'react'
import { Input } from 'reactstrap';

import {createExpense} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import { useHistory } from 'react-router-dom';
// import states from "../../../assets/state.json";

const CreateMyExpense =(props) => {
  
  const [OrderId, SetOrderId]= useState(null)
  const [Transportationcharge, setTransportationcharge] = useState(0)
  const [Labourcharge, setLabourcharge] = useState(null)
  const[Packagingmaterialcharge,SetPackagingmaterialcharge]=useState(0);
  const[expense,setExpense]=useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('');
  const history = useHistory();
  
  const orderId = props.location.state && props.location.state.id
  console.log('orderId', orderId);

//   const getUserData= async () => {
//     try {
//       const res = await getUserList();
//       setUserList(res && res.data.data.users)
//       setLoading(false)
//     }catch (e) {
//       console.log("Error User" , e)
//       setError(true);
//       setErrMsg('Something went wrong')
//     }finally {
//       setLoading(false)
//     }
//   }



  const handleSubmit= async (e)=>{
    try{
      setLoading(true)
      e.preventDefault();

      const data = {
        orderId,
        transportCharge: Transportationcharge,
        labourCharge: Labourcharge,
        packingCharge: Packagingmaterialcharge,
        }
      await createExpense(data);
      setLoading(false)
      setError(false)
      setSucessMsg('Expense created successfully')
      setSucess(true)
      setTimeout(()=> {
        history.push('/my-expense')
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
useEffect(()=> {
    const caculatedExpense= (Number(Transportationcharge || 0) + Number(Labourcharge || 0)+ Number(Packagingmaterialcharge || 0));
    setExpense(caculatedExpense);
  },[Transportationcharge, Labourcharge, Packagingmaterialcharge]);
 
 

  return(
    <div className="whiteBox" style={{ marginBottom: 20 }}>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <h4 className="title-heading">Create Expense</h4>
      <form>
        <div className="form-element">
          <label >OrderId </label>
          <Input type="text" placeholder="Enter orderId" autoComplete="name" value={orderId} onChange={(e) => SetOrderId(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Transportation charge</label>
          <Input type="text" placeholder="Enter Transportation charge" autoComplete="name" onChange={(e) => setTransportationcharge(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Labour charge</label>
          <Input type="text" placeholder="Enter Labour charge" autoComplete="name" onChange={(e) => setLabourcharge(e.target.value)} />
        </div>
       

        <div className="form-element">
          <label >Packaging material charge</label>
          <Input type="text" placeholder="Enter Packaging material charge" autoComplete="name" onChange={(e) => SetPackagingmaterialcharge(e.target.value)} />
        </div>
        <div className="form-element">
          <label >totalExpense</label>
          <Input type="text" placeholder="Enter totalExpense" autoComplete="name" value={expense} onChange={(e) => setExpense(e.target.value)} />
        </div>
        
      
        <div className="submit-wrap">
          <button className="common-btn" type="submit" size="sm" color="primary"onClick={handleSubmit} >Submit</button>
        </div>
      </form>
    </div>
  )
}
export default CreateMyExpense;
