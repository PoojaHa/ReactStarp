import React from 'react';
const Tracking = () => {

  return (
    <div className='zmp-detail-page post-page'>
      <div className="search-outer">
        <input name="" className="search-box" placeholder="Search" type="text" />
        <input className="search" type="submit" value="" />
      </div>
      <div className="whiteBox">
        <h4 className="title-heading">Track history</h4>
        <div className="status-full-info">
          <ul>
            <li className="service-started">
              <h4>PICKUP ADDRESS</h4>
              <p>35/37 ludgate Hill, Londan, EC4M 7JN</p>
              <span>09/12/2019, 09:45AM - 11:00AM</span>
            </li>
            <li className="service-status">
              <h4>DELIVERY STOPS </h4>
              <ul className="delivery-stop">
                <li>
                  <h6>Stop 1</h6>
                  <p>189 Amet,Southern Park 96 - 36F </p>
                  <span>09/12/2019, 09:45AM - 11:00AM</span>
                </li>
                <li>
                  <h6>Stop 2</h6>
                  <p>189 Amet,Southern Park 96 - 36F </p>
                  <span>09/12/2019, 09:45AM - 11:00AM</span>
                </li>
                <li>
                  <h6>Stop 3</h6>
                  <p>189 Amet,Southern Park 96 - 36F </p>
                  <span>09/12/2019, 09:45AM - 11:00AM</span>
                </li>
                <li>
                  <h6>Stop 4</h6>
                  <p>189 Amet,Southern Park 96 - 36F </p>
                  <span>09/12/2019, 09:45AM - 11:00AM</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
