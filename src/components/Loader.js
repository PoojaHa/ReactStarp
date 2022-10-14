import React, { useState, useEffect} from 'react';
import { Spinner } from 'reactstrap';
const Loader = (props) => {
    return(
        // <div className="loader-wrapper">
        //     <div className="loader">               
        //     </div>
        // </div>

        <div className="loader-wrapper">
            <div className="loader-outer">
                <Spinner color="primary" />
                {/* <div className="loader"></div> */}
            </div>
        </div>
    )
}
export default Loader;