import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { cabretApi } from '../redux/api'
import Loader from './Loader';
import Popup from './Popup';

const FaqRow = (props) => {
    const { data, sno, refetch, setRefetch } = props;
    let [modal, setModal] = useState(false);
    let [modalDelete, setModalDelete] = useState(false);
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [isData, setIsData] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sucessMsg, setSucessMsg] = useState('')
    const EditFaq = () => {
        setModal(!modal);
    }
    if (isData && data && data.question && data.answer) {
        setAnswer(data.answer)
        setQuestion(data.question)
        setIsData(false)
    }
    const handleUpdate = () => {
        setLoading(true)
        let dataInput = {}
        if (answer !== data.answer) {
            dataInput.answer = answer
        }
        if (question !== data.question) {
            dataInput.question = question
        }
        if (dataInput && data.id) {
            console.log(dataInput)
            let dataSent = JSON.stringify(dataInput)
            cabretApi.put(`/api/faq/${data.id}`, dataSent, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {
                console.log("faq updated", res)
                setLoading(false)
                setError(false)
                setSucessMsg('FAQ Updated successfully')
                setSucess(true)
                setRefetch(refetch + 1)
                setModal(!modal)
            }).catch(err => {
                console.log(err)
                setErrMsg(err.response.data.message)
                setLoading(false)
                setSucess(false)
                setError(true)
            })
        }
        else {
            console.log("data", data)
            setModal(!modal)
        }
    }
    const deleteModal = () => {
        setModalDelete(!modalDelete);
    }
    const handleDelete = () => {
        setLoading(true)
        cabretApi.delete(`/api/faq/${data.id}`).then(res => {
            console.log(res)
            setLoading(false)
            setError(false)
            setSucessMsg('FAQ deleted Sucessfully')
            setSucess(true)
            setRefetch(refetch + 1)
            setModalDelete(!modalDelete);
        }).catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            setLoading(false)
            setSucess(false)
            setError(true)
        })
    }

    return (
        <>
            {loading && <Loader />}
            {(error || sucess) && <Popup error={error} message={error ? errMsg : sucessMsg} onClick={() => setError(false)} setSuccess={setSucess} success={sucess} />}
            <tr>
                <td width="50">{sno}</td>
                <td>
                    <h4>{data.question}?</h4>
                    <p>{data.answer}.</p>
                </td>
                <td className="table_child">
                    <button className="view-btn" onClick={EditFaq}>Update</button>
                    <button className="delete-action" onClick={deleteModal}>Delete</button>
                </td>
            </tr>
            <Modal isOpen={modal} toggle={EditFaq}>
                <ModalHeader toggle={EditFaq}>Update</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-element">
                            <label>Question</label>
                            <input type="text" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <label>Answer</label>
                            <textarea className="form-control" col={5} onChange={(e) => setAnswer(e.target.value)}>{answer}</textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                    <Button color="secondary" onClick={EditFaq}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete} toggle={deleteModal}>
                <ModalHeader toggle={deleteModal}>Delete</ModalHeader>
                <ModalBody>
                    <p>Are you sure, you want to Delete ?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={deleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}

export default FaqRow;
