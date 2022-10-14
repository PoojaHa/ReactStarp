import React from 'react';
import { Link } from 'react-router-dom';

const AddBtn = (props) => {

    const {onClick, to,id} = props;
    return(
        <div className="add-more-container">
            <Link to={{
                pathname:to,
                state: {
                    id:id
                }
            }} className="custom-tooltip" data-name="Add Faq" onClick={onClick}><span className="mdi">+</span></Link>
        </div>
    )
}

export default AddBtn;
