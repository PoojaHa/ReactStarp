import React ,{ useState,useEffect} from 'react';
import * as formData from 'form-data';
import {cabretApi} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const UploadEditBanner = (props) => {
    const [homeSlide1, setHomeSlide1] = useState(false);
    const [homeUpdate, setHomeUpdate] = useState(false)
    const [homeId,setHomeId]=useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    const [count,setCount]= useState(0)

    useEffect(()=>{
        setLoading(true)
        cabretApi.get('/api/banner').then(res => {
            setLoading(false)
            if (res.data && res.data.data && res.data.data.length > 0) {
                setHomeUpdate(true)
                setHomeId(res.data.data[0]._id)
                setHomeSlide1(res.data.data[0].bannerImage)
            }
        }).catch(err=>{
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    },[count])


    const handleHome=(e)=>{
        setLoading(true)
        e.preventDefault()
        if(homeUpdate)
        {
            const dataBody = new formData();
            dataBody.append('banner', homeSlide1);
            cabretApi.put(`/api/banner/${homeId}`, dataBody).then(res => {
                console.log("banner",res)
                setCount(count+1)
                setLoading(false)
                setError(false)
                setSucessMsg('Banner updated successfully')
                setSucess(true)
            }).catch(err => {
                console.log(err)
                setErrMsg(err.response.data.message)
                setLoading(false)
                setSucess(false)
                setError(true)
            })
        }
        else{
            const dataBody = new formData();
            dataBody.append('banner', homeSlide1);
            cabretApi.post('/api/banner', dataBody).then(res => {
                console.log(res)
                setCount(count + 1)
                setLoading(false)
                setError(false)
                setSucessMsg('Banner Created successfully')
                setSucess(true)
            }).catch(err => {
                console.log(err)
                setErrMsg(err.response.data.message)
                setLoading(false)
                setSucess(false)
                setError(true)
            })
        }
    }

    return (
        <div className="Banner-links">
           <div className="whiteBox homeBanner">
                {loading && <Loader />}
                {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
               <h3 className="title-heading">Home Page Banner</h3>
               <div className="pic-row">
                    <img src={homeSlide1 ? homeSlide1 : require('../../../assets/img/no-image.svg')} className="pic-size"/>
                </div>
               <form>
                   <div className="form-element">
                       <label>Banner</label>
                        <input type="file" className="form-control"  onChange={(e) => setHomeSlide1(e.target.files[0])} />
                    </div>
                    <div className="submit-wrap">
                        <button className="common-btn" type="submit" onClick={handleHome}>Save</button>
                    </div>
               </form>
           </div>
        </div>
    )
}
export default UploadEditBanner
