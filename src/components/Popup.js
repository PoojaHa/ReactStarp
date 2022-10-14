import React, { useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
const Popup = (props) => {
    const { error, message, onClick, setSuccess, success} = props;
    const [modal, setModal] = useState(true);

    const ChangeOrderStatus = (e) => {
        e.preventDefault();
        if (error) {
            return null;
        }
        else {
            setSuccess(false);
        }
    }
    return(
        <Modal isOpen={modal} toggle={ChangeOrderStatus}> {/* toggle={ChangeOrderStatus}*/}
            {/* <ModalHeader toggle={ChangeOrderStatus}>Add Specification</ModalHeader> */}
            <ModalBody>
                <div className="spcl-popup">
                    <img src={error ? require('../assets/img/error.png') : require('../assets/img/success.png')} className="modal-spcl-image" />
                    <h3 className={"modal-spcl-heading " + (error ? "errorTitle" : "successTitle")}>{error ? "Error" : "Success"}</h3>
                    <p>{message}</p>

                    {error &&
                        <div className="submit-wrap">
                            <button className="common-btn" onClick={onClick}>Okay</button>
                        </div>
                    }
                </div>
            </ModalBody>
        </Modal>
    )
}

export default Popup;