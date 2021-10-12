import React, { useState, useEffect } from "react";


import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Forget from "./components/Login/Forget";
import Reset from "./components/Login/Reset";
import Logout from "./components/Login/Logout";

import Dashboard from "./components/Dashboard/Dashboard";

import BeforeLoginRoute from "./components/common/BeforeLoginRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import ScrollToTop from 'react-router-scroll-top';
import './css/custom.css';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Layout from "./components/common/Layout";
import User from "./components/User/User";
// import Addclient from "./components/Client/addclient";
import Editclient from "./components/User/EditUser";
// import Licences from "./components/Licencing/Licence";
// import AddLicence from "./components/Licencing/addLicence";
// import EditLicence from "./components/Licencing/editLicence";
import Profile from "./components/Profile/Profile";
import changePassword from "./components/Profile/changePassword";
// import Knowledge from "./components/Knowledge/knowledge";
// import AddKnowledge from "./components/Knowledge/addKnowledge";
// import EditKnowledge from "./components/Knowledge/editKnowledge";
// import Category from "./components/Category/Category";
// import SubCategory from "./components/SubCategory/SubCategory";



import {
  userContext,
} from "./context/userContext";
import Tenant from "./components/User/Tenant";
import EditHomePage from "./components/EditHomePage/CreditProofServices";
import HowCreditProofWorks from "./components/EditHomePage/HowCreditProofWork";
import OurHappyClient from "./components/EditHomePage/OurHappyClient";
import ContactUs from "./components/EditHomePage/ContactUs";
import CheckEmail from "./components/EmailReport/CheckEmail";
import NotcompletedPage from "./components/EmailReport/NotcompletedPage";
import CompletedEmailPage from "./components/EmailReport/CompletedEmailPage";
import ShowTenant from "./components/Tenant/ShowTenant";
import RentReport from "./components/User/RentReport";


const App = (props) => {
  // {process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE}
  const [user, setUser] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: ""

  });

  useEffect(async () => {

  }, []);

  const UpdateUserContext = (data) => {

    setUser(data);
  };

  return (
    <userContext.Provider
      value={{
        user: user,
        UpdateUserContext: UpdateUserContext,
      }}
    >
      <Router>
        <ReactNotification />
        <ScrollToTop>
          <Switch>
            <BeforeLoginRoute
              exact
              path="/login"
              component={Login}
            />
            <BeforeLoginRoute
              exact
              path="/forgot"
              component={Forget}
            />
            <BeforeLoginRoute
              exact
              path="/reset/:userId/:resetToken"
              component={Reset}
            />
            <Layout location_props={props}>
              <PrivateRoute
                exact
                path="/"
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path="/profile"
                component={Profile}
              />
              <PrivateRoute
                exact
                path="/change-password"
                component={changePassword}
              />

              <PrivateRoute
                exact
                path="/User"
                component={User}
              />
              <PrivateRoute
                exact
                path="/Tenant/:landlordId"
                component={Tenant}
              />
              <PrivateRoute
                exact
                path="/show-rent-report/:landlordId"
                component={RentReport}
              />
              <PrivateRoute
                exact
                path="/Edit/:id"
                component={Editclient}
              />
              <PrivateRoute
                exact
                path="/Email"
                component={CheckEmail}
              />
              <PrivateRoute
                exact
                path="/email-not-send"
                component={NotcompletedPage}
              />
              <PrivateRoute
                exact
                path="/email-send-completed"
                component={CompletedEmailPage}
              />
              <PrivateRoute
                exact
                path="/Edit-Home-Page"
                component={EditHomePage}
              />
              <PrivateRoute
                exact
                path="/how-credit-work"
                component={HowCreditProofWorks}
              />
              <PrivateRoute
                exact
                path="/our-happy-client"
                component={OurHappyClient}
              />
              <PrivateRoute
                exact
                path="/contact-us"
                component={ContactUs}
              />
            </Layout>
          </Switch>
        </ScrollToTop>
      </Router>
    </userContext.Provider>
  );
}

export default App;





// <PrivateRoute
//   exact
//   path="/add-client"
//   component={Addclient}
// />
// <PrivateRoute
//   exact
//   path="/edit-client/:id"
//   component={Editclient}
// />

// <PrivateRoute
//   exact
//   path="/licence"
//   component={Licences}
// />
// <PrivateRoute
//   exact
//   path="/add-licence"
//   component={AddLicence}
// />
// <PrivateRoute
//   exact
//   path="/edit-licence/:id"
//   component={EditLicence}
// />
// <PrivateRoute
//   exact
//   path="/logout"
//   component={Logout}
// />
// <PrivateRoute
//   exact
//   path="/knowledge"
//   component={Knowledge}
// />
// <PrivateRoute
//   exact
//   path="/add-knowledge"
//   component={AddKnowledge}
// />
// <PrivateRoute
//   exact
//   path="/edit-knowledge/:id"
//   component={EditKnowledge}
// />
// <PrivateRoute
//   exact
//   path="/category"
//   component={Category}
// />
// <PrivateRoute
//   exact
//   path="/sub-category"
//   component={SubCategory}
// />

// </Layout>