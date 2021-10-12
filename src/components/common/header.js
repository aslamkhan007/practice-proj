import React, { useState, useEffect, useContext } from "react";
import {
  userContext,
} from "../../context/userContext";
import * as CONFIG from "../../config.json";
import { Link } from "react-router-dom";
import $ from "jquery";
const Header = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({ email: '', password: '' });
  var context = useContext(userContext)
  const userData = JSON.parse(localStorage.getItem('userData'));
  const fullName = context && context.user && context.user && context.user.fullName
  console.log(context   , "  context    context");
  // console.log(context.user.data.fullName,"hhhwwwwwwwwwwhhhhhhhhhhhhhhhhhhhhhh");
  useEffect(async () => {
    let user_data = JSON.parse(localStorage.getItem('userData'));
    console.log(user_data, 'user_data');
    if (user_data.data) {
      context.UpdateUserContext(user_data.data);

    }
  }, []);

  const handleLogout = async () => {
    console.log("logout");
    localStorage.clear();
    window.location.href = "/login";


  }

  const onToggleSidebar = async () => {

    $("body").toggleClass("sidebar-icon-only");

  }
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <Link className="navbar-brand brand-logo" to="/"><b>Super Admin</b></Link>
          <Link className="navbar-brand brand-logo-mini" to="/"><b>SA</b></Link>
          <button className="navbar-toggler navbar-toggler align-self-center" onClick={() => { onToggleSidebar() }}>
            <span className="mdi mdi-sort-variant" />
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav mr-lg-4 w-100">
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <span className="nav-profile-name">{fullName && fullName}</span>
              <img src="/assets/images/userProfile.png" alt="profile" />


            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <Link className="dropdown-item" to="/profile">
                <i className="mdi mdi-account text-primary" />
                Profile
              </Link>
              <Link className="dropdown-item" to="/change-password">
                <i className="mdi mdi-settings text-primary" />
                Settings
              </Link>
              <Link className="dropdown-item" onClick={() => handleLogout()}>
                <i className="mdi mdi-logout text-primary" />
                Logout
              </Link>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
  );
};

export default Header;

// <img src={`${CONFIG.API_URL}/uploads/${context.user.profile_img}`} alt="profile" />
// <span className="nav-profile-name">{context.user.first_name} {context.user.last_name}</span>