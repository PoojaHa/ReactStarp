/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react'
import { Input } from 'reactstrap';
import {createUser,getUserList,editUser} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import { useHistory } from 'react-router-dom';


// import Specification from './Specification'
const EditUser = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [userRole, setUserRole] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [sucessMsg, setSucessMsg] = useState('');
  const history = useHistory();


  useEffect(()=>{
    getUserData();
  },[])
  const handleSubmit= async (e)=>{
    try{
      setLoading(true)
      e.preventDefault();
      const data = {
        name,
        email,
        userId
      }
      const res = await editUser(data);
      console.log('response',res);
      setLoading(false)
      setError(false)
      setSucessMsg('User updated successfully')
      setSucess(true);
      await getUserData();
      setTimeout(()=> {
        history.push('/consumer/list')
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
  const userId = props.location.state && props.location.state.id
  //console.log(userId)
  // pull or bind
  const getUserData = async () => {
    setLoading(true)
    try {
      const res = await getUserList();
      console.log('userlist',res);
      const userDetail = res && res.data.data.users.filter((item) => item._id === userId.toString())[0];
      console.log('detail',userDetail)
      setName(userDetail.name);
      setEmail(userDetail.email);
      setPhone(userDetail.mobile);
      setUserRole(userDetail.role);
      setLoading(false);
    
    }catch (e) {
      console.log("Error User" , e)
      setError(true);
      setErrMsg('Something went wrong')
    }finally {
      setLoading(false)
    }
  }
  const UserType = ['user'];
  const renderUserType = UserType.map((user, index) => <option key={user+ index} value={user}>{user}</option>);

  return(
    <div className="whiteBox" style={{ marginBottom: 20 }}>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <h4 className="title-heading">Edit User</h4>
      <form>
        {/* <div className="form-element">
                        <label>Upload Image</label>
                        <input className="form-control" type="file" autoComplete="image" onChange={e => { setPicture(e.target.files[0]); console.log(e.target.files[0]) }} />
                        {picture && <img src={URL.createObjectURL(picture)} alt="upload" style={{ width: 300, hight: 300 }} />}

                    </div> */}
        <div className="form-element">
          <label >Name</label>
          <Input type="text" placeholder="Enter Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-element">
          <label >Email</label>
          <Input type="text" placeholder="Enter email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Phone</label>
          <Input type="number" placeholder="Enter Phone" autoComplete="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-element">
          <label for="exampleSelect">Role</label>
          <select id="dropdown" className="form-control" value={userRole} onChange={(e) => {setUserRole(e.target.value) }}>
            <option value={null} selected hidden>Select Type</option>
            {renderUserType}
          </select>
        </div>
        <div className="submit-wrap">
          <button className="common-btn" type="submit" size="sm" color="primary" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default EditUser;
