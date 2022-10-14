import React, {useState} from 'react'
import { Input } from 'reactstrap';
import {createUser} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import { useHistory } from 'react-router-dom';

const CreateUser =(props) => {
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


  const handleSubmit= async (e)=>{
    try{
      setLoading(true)
      e.preventDefault();
      const data = {
        name,
        email,
        mobile: phone,
        role: userRole
      }
      await createUser(data);
      setLoading(false)
      setError(false)
      setSucessMsg('User created successfully')
      setSucess(true)
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

  const UserType = ['user',];
  const renderUserType = UserType.map((user, index) => <option key={user+ index} value={user}>{user}</option>);

  return(
    <div className="whiteBox" style={{ marginBottom: 20 }}>
      {loading && <Loader />}
      {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
      <h4 className="title-heading">Add User</h4>
      <form>
        {/* <div className="form-element">
                        <label>Upload Image</label>
                        <input className="form-control" type="file" autoComplete="image" onChange={e => { setPicture(e.target.files[0]); console.log(e.target.files[0]) }} />
                        {picture && <img src={URL.createObjectURL(picture)} alt="upload" style={{ width: 300, hight: 300 }} />}

                    </div> */}
        <div className="form-element">
          <label >Name</label>
          <Input type="text" placeholder="Enter Name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-element">
          <label >Email</label>
          <Input type="text" placeholder="Enter email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-element">
          <label >Phone</label>
          <Input type="number" placeholder="Enter Phone" autoComplete="phone" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-element">
          <label for="exampleSelect">Role</label>
          <select id="dropdown" className="form-control" onChange={(e) => {setUserRole(e.target.value) }}>
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
export default CreateUser;
