import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const Footer = () => {
  const sslcommerzImg = '/paysslc.png';
  return (
    <div className="footer-container">
      <ContentWrapper>
        <div className="flex justify-between">
          <div className="flex flex-col gap-3 ">
            <h4 className='text-lg font-semibold'>Triplo</h4>
            <Link to={'/about'}>About Us</Link>
            <Link to={'/about'}>Terms</Link>
            <Link to={'/privacy-policy'}>Privacy Policy</Link>
            <Link to={'/refund-policy'}>Privacy Policy</Link>
          </div>

          <div className=''>
          <h4 className='text-lg font-semibold'>Payment Methods</h4>
            <img className="w-80 h-48 basis-6/12" src={sslcommerzImg} alt="paymentImg" />
          </div>
          <div className=' flex flex-col gap-4'>
            <div className=' flex flex-col gap-3'>
            <h2>Contact</h2>
              <p>Triplo Travels</p>
              <p><FontAwesomeIcon icon={faPhone} /> {' '} +8801812681407</p>
              <p> <FontAwesomeIcon icon={faEnvelope} /> {' '}mithuvowmick96@gmail.com</p>
            </div>
            <div>
              <Link to={'/'}><FontAwesomeIcon icon={faFacebook} size="2xl" style={{color: "#094dc3",}} /></Link>
              <Link to={'/'}><FontAwesomeIcon className='px-4' icon={faInstagram} size="2xl" style={{color: "#ea3ea2",}} /></Link>
              <Link to={'/'}><FontAwesomeIcon icon={faLinkedin} size="2xl" style={{color: "#003ea8",}} /></Link>
            </div>

          </div>
          {/* <div></div> */}
        </div>
        <div className='footer-bottom'>
          <p className='pt-5'>2023 © Triplo Travels. All rights reserved.</p>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
