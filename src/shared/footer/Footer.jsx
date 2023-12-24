import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const Footer = () => {
  const sslcommerzImg = '/paysslc.png';
  return (
    <div className="footer-container">
      <ContentWrapper>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-3 mb-5 lg:mb-0">
            <h4 className='text-lg font-semibold'>Classic IT</h4>
            <Link to={'/about'}>About Us</Link>
            <Link to={'/about'}>Terms</Link>
            <Link to={'/privacy-policy'}>Privacy Policy</Link>
            <Link to={'/refund-policy'}>Refund Policy</Link>
          </div>

          <div className='lg:ml-10'>
            <h4 className='text-lg font-semibold'>Payment Methods</h4>
            <img className="w-full lg:w-80 h-48 mb-5 lg:mb-0" src={sslcommerzImg} alt="paymentImg" />
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              <h2>Contact</h2>
              <p>Classic IT</p>
              <p><FontAwesomeIcon icon={faPhone} /> +8801812681407</p>
              <p><FontAwesomeIcon icon={faEnvelope} /> mithuvowmick96@gmail.com</p>
            </div>
            <div className='flex gap-4'>
              <Link to={'/'}><FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: "#094dc3" }} /></Link>
              <Link to={'/'}><FontAwesomeIcon className='px-4' icon={faInstagram} size="2x" style={{ color: "#ea3ea2" }} /></Link>
              <Link to={'/'}><FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: "#003ea8" }} /></Link>
            </div>
          </div>
        </div>

        <div className='footer-bottom mt-5'>
          <p>2023 © Classic IT. All rights reserved.</p>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;

