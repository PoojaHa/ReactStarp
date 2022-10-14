import React,{useState,useEffect} from 'react';
import {cabretApi} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const PrivacyPolicy = () => {
    const [privacyId,setPrivacyId]=useState(null)
    const [privacyText, setPrivacyText] = useState('')
    const [update,setUpdate]=useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')

    useEffect(()=>{
        setLoading(true)
        cabretApi.get('/api/page/PRIVACY').then(res=>{
            console.log(res)
            setLoading(false)
            if(res.data.data.length<1)
            {
                setUpdate(false)
                return;
            }
            setPrivacyId(res.data.data[0]._id)
            setPrivacyText(res.data.data[0].content)
        }).catch(err=>{
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    },[])
    const handleSave=(e)=>{
        setLoading(true)
        console.log("aa bhi rha h")
        e.preventDefault()
        if(update)
        {
            let data={
                content:privacyText
            }
            let dataInput=JSON.stringify(data)
            cabretApi.put(`/api/page/${privacyId}`, dataInput,{
            headers: {
                'content-type': 'application/json'
            }
        }).then(res=>{
            console.log(res)
            setLoading(false)
            setError(false)
            setSucessMsg('Policy Added successfully')
            setSucess(true)
        }).catch(err=>{
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setSucess(false)
            setError(true)
        })
        }
        else{
            let data = {
                pageType: 'PRIVACY',
                content: privacyText
             }
             let dataInput=JSON.stringify(data)
            cabretApi.post(`/api/page`, dataInput, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res=>{
                console.log(res)
                setLoading(false)
                setError(false)
                setSucessMsg('Policy created successfully')
                setSucess(true)
            }).catch(err=>{
                console.log(err)
                setErrMsg(err.response.data.message)
                setLoading(false)
                setSucess(false)
                setError(true)
            })
        }
         
    }
    return (
        <div className="whiteBox privacyPolicy">
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <form>
                <div className="form-element">
                    <label>Update Privacy Policy</label>
                <textarea className="form-control" defaultValue={privacyText} onChange={(e)=>setPrivacyText(e.target.value)}></textarea>
                </div>
                <div className="submit-wrap">
                    <button className="common-btn" type="submit" onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PrivacyPolicy;