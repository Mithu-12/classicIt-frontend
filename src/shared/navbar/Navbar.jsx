
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import logo from '/logo.svg';
import {
  faUser,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
// import LogoutButton from '../../components/Logout/Logout';


import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import LogoutButton from '../../components/logout/Logout';
import { useAuth } from '../../context/AuthContext';
import useCart from '../../hooks/useCart';
// import useOutsideClick from '../../hooks/useOutsideClick';

const Navbar = () => {
 
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    navigate(`/${option}`);
  };
const [cart] = useCart()
console.log('this is cart',cart)
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow('hide');
      } else {
        setShow('show');
      }
    } else {
      setShow('top');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

//   useOutsideClick(dropdownRef, () => {
//     setIsDropdownOpen(false);
//   });

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${show} `}>
      <ContentWrapper>
        <div className="logo flex items-center justify-center gap-2" onClick={() => navigate('/')}>
        {/* <img src={'logo'} alt="Tryotel Logo" width="33.958" height="33.93"/> */}
        <h3 className={`font-semibold text-2xl text-white `}>MediaBook</h3>
        </div>
        <ul className={`menuItems`}>
          <li
            className={`menuItem ${
              selectedOption === 'media' ? 'active' : ''
            } `}
            onClick={() => handleOptionClick('media')}
          >
            <div className="flex flex-col">
             
              <Link to="/product">Product</Link>
            </div>
          </li>
          
          <li
            className={`menuItem ${selectedOption === 'about' ? 'active' : ''}`}
            // onClick={() => handleOptionClick('about')}
          >
            <div className="flex flex-col">
             
              <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} /> 
              <span>{cart?.length || 0}</span>
              </Link>
            </div>
          </li>
          
        </ul>

        <div className={``}>
          {user ? (
            <div className="navbar-user-dropdown">
              <div
                className="navbar-image-container"
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.picture ? (
                  <img
                    className="navbar-image-content"
                    src={user.picture}
                    alt="User"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              {isDropdownOpen && (
                <div className="navbar-dropdown-menu">
                 
                  <Link to="/about" className="navbar-dropdown-item">
                    Profile
                  </Link>
                 
                  <button className="navbar-dropdown-item">
                    <LogoutButton />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="navbar-login-link" to="/login">
              <FontAwesomeIcon icon={faUser} /> SIGN IN
            </Link>
          )}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Navbar;
