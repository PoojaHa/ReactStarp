import React,{useState,useEffect} from 'react';
import {cabretApi} from '../../../redux/api'
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const TermsCondition = () => {
    const [termsId, setTermsId] = useState(null)
    const [termsText, setTermsText] = useState('')
    const [update, setUpdate] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')

    useEffect(() => {
        setLoading(true)
        cabretApi.get('/api/page/TC_ALL').then(res => {
            console.log(res)
            setLoading(false)
            if (res.data.data.length < 1) {
                setUpdate(false)
                return;
            }
            setTermsId(res.data.data[0]._id)
            setTermsText(res.data.data[0].content)
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    }, [])
    const handleClick = (e) => {
        console.log("aa bhi rha h")
        setLoading(true)
        e.preventDefault()
        if (update) {
            let data = {
                content: termsText
            }
            let dataInput = JSON.stringify(data)
            cabretApi.put(`/api/page/${termsId}`, dataInput, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                setLoading(false)
                setError(false)
                setSucessMsg('T&C updated successfully')
                setSucess(true)
            }).catch(err => {
                console.log(err)
                setErrMsg(err.response.data.message)
                setLoading(false)
                setSucess(false)
                setError(true)
            })
        }
        else {
            let data = {
                pageType: 'TC_ALL',
                content: termsText
            }
            let dataInput = JSON.stringify(data)
            cabretApi.post(`/api/page`, dataInput, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                setLoading(false)
                setError(false)
                setSucessMsg('T&C created successfully')
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
        <div className="whiteBox privacyPolicy">
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <form>
                <div className="form-element">
                    <label>Update Terms and Condition</label>
                    <textarea className="form-control" defaultValue={termsText} onChange={(e) => setTermsText(e.target.value)}></textarea>
                </div>
                <div className="submit-wrap">
                    <button className="common-btn" type="submit" onClick={handleClick}>Save</button>
                </div>
            </form>
        </div>

    )
}
export default TermsCondition