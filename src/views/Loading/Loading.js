import { Modal, Spinner, Row, Container } from 'reactstrap';
import React from 'react';

const Loader=()=>(
    <div style={{ position: 'fixed', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5', zIndex: '99',
top: 0,left: 0,}}>
        <div className='spinnerLoading'>
            <Spinner style={{width:'3em', height:'3em'}} color="success" />
    </div>
        
    </div>
)
export default Loader