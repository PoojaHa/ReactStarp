import React, { useState, useEffect} from 'react';
import FaqRow from '../../../components/FaqRow';
import AddBtn from '../../../components/AddBtn';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { cabretApi } from '../../../redux/api';
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';

const AddEditFaq = (props) => {
    let [modal, setModal] = useState(false);
    const [refetch,setRefetch]=useState(0);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [faqList,setFaqList]=useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')

    useEffect(()=>{
        setLoading(true)
        cabretApi.get('/api/faq').then(res=>{
            console.log(res)
            setLoading(false)
            setFaqList(res.data.data)
        }).catch(err=>{
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setError(true)
        })
    },[refetch])
    const CancleFaq = () => {
        setModal(!modal);
    }
    const AddFaq =()=>{
        setLoading(true);
        if (question == null || question.trim() === '') {
            setLoading(false)
            setErrMsg('Please enter question')
            setError(true)
        }
        else if (answer == null || answer.trim() === '') {
            setLoading(false)
            setErrMsg('Please enter answer')
            setError(true)
        }
        else {
        let data={
            question,
            answer
        }
        let dataInput=JSON.stringify(data)
        cabretApi.post('/api/faq', dataInput,{
            headers: {
                'content-type': 'application/json'
            }
        }).then(res=>{
            console.log(res)
            setLoading(false)
            setError(false)
            setSucessMsg('FAQ Added successfully')
            setSucess(true)
            setRefetch(refetch + 1)
            setModal(!modal)
        }).catch(err=>{
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setSucess(false)
            setError(true)
        })
    }
    }
    const data= faqList.length>0 ? faqList.map(item=>{
        return{
            question: item.question ? item.question:'NA',
            answer: item.answer ? item.answer :'NA',
            id: item._id?item._id:'123abc'
        }
    }):[]
    console.log(data)
    const faqData = [
        {
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        }
    ]

    const faq = data.map((item, index) => {
        return(
            <FaqRow key={"faq-" + index} data={item} sno={index + 1} refetch={refetch} setRefetch={setRefetch} />        )
    })
    return (
        <div className="whiteBox faqEdit">
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <table className="table table2">
                <tbody>
                    {faq}
                </tbody>
            </table>

            <AddBtn onClick={CancleFaq} />

            <Modal isOpen={modal} toggle={CancleFaq}>
                <ModalHeader toggle={CancleFaq}>Add Question</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Question</label>
                            <input type="text" className="form-control" onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Answer</label>
                            <textarea className="form-control" col={5} onChange={(e) => setAnswer(e.target.value)}></textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={AddFaq}>Add</Button>{' '}
                    <Button color="secondary" onClick={CancleFaq}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}
export default AddEditFaq;