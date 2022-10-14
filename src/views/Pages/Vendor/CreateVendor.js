import React, {useState} from 'react'
import { Input } from 'reactstrap';
import {createVendor} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import Multiselect from 'multiselect-react-dropdown';
import states from '../../../assets/state.json';
import { useHistory } from 'react-router-dom';
const CreateVendor =(props) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [organizationName, setOrganizationName] = useState(null);
    const [organizationAddress, setorganizationAddress] = useState(null);
    const [organizationType, setOrganizationType] = useState(null);
    const [operationalState, setOperationalState] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    const history = useHistory();

    const handleMultipleSelect = (selectedList, selectedItem) => {
        setOperationalState(selectedList);
        document.getElementById("multiselect")
        .addEventListener("keyup", function(event) {
          event.preventDefault();
          if (event.key === 'Enter') {
            console.log('do nothing')
            // document.getElementById("multiselect").click();
          }
        });
    }

    const handleSubmit= async (e)=>{
        try{
            setLoading(true)
            e.preventDefault();
            const data = {
                fullName: name,
                email,
                mobile: phone,
                organization: {
                    name: organizationName,
                    category: organizationType,
                    operationalArea: operationalState.map(state => state.name),
                    location: organizationAddress
                }
            }
            await createVendor(data);
            setLoading(false)
            setError(false)
            setSucessMsg('Vendor created successfully')
            setSucess(true)
            setTimeout(()=> {
                history.push('/vendor/vendor-list')
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

    const merchantType = ['PACKERS', 'TRANSPORTER',];
    const options = Object.keys(states).map(k => ({id: k, name:states[k]}));
    const renderMerchantType = merchantType.map((merchant, index) => <option key={merchant+ index} value={merchant}>{merchant}</option>);

    return(
            <div className="whiteBox" style={{ marginBottom: 20 }}>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
                <h4 className="title-heading">Add Merchant</h4>
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
                        <label >Organization Name</label>
                        <Input type="text" placeholder="Enter company name" onChange={(e) => setOrganizationName(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label >Organization Address</label>
                        <Input type="text" placeholder="Enter company address" onChange={(e) => setorganizationAddress(e.target.value)} />
                    </div>
                    <div className="form-element">
                        <label for="exampleSelect">Operational States</label>
                        <Multiselect id={'multiselect'} options={options} displayValue="name" onSelect={handleMultipleSelect} selectedValues={operationalState}/>
                    </div>
                    <div className="form-element">
                        <label for="exampleSelect">Type</label>
                        <select id="dropdown" className="form-control" onChange={(e) => {setOrganizationType(e.target.value) }}>
                            <option value={null} selected hidden>Select Type</option>
                            {renderMerchantType}
                        </select>
                    </div>
                    <div className="submit-wrap">
                        <button className="common-btn" type="submit" size="sm" color="primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
        </div>
    )
}
export default CreateVendor;
