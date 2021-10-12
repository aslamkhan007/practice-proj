import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/AuthApi";
import { CreateNotification } from "../../Utils/notification";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:''});


  const isFormValid = () => {
    const { email, password, } = data;
    
    var regex_email = /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      setError({ email: "Email field is required!"});
        return false;
    }
    else if (email && !email.match(regex_email)) {
      setError({email: "Enter a valid email" });
        return false;
    } else {
      setError({});
        return true;
    }

}
  const handleSubmit = async() =>
  {
    const isValid = await isFormValid();

    if(isValid)
    {
      const loginResponse = await USERAPI.ForgotAPI(data);
      if(loginResponse.data.status == 200)
      {
      CreateNotification("success", "please check your email for change password ")
      setTimeout(()=>{
        props.history.push('/login')
      },1000)
      }
      else
      {
      CreateNotification("danger",loginResponse.data.message)
      }
    }
    
      // props.history.push('/')
  }

  const onchange = async(event) =>
  {
    setError({});
   
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
   
  }

  useEffect(async()=>{

  },[]);

    return (
      <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src="/assets/images/logo.svg" alt="logo" /> */}
                </div>
                <h4 className="centre form-group">Forgot Password</h4>
                {/* <h6 className="font-weight-light">Sign in to continue.</h6> */}
                
                  <div className="form-group">
                    <input type="email" name="email" onChange={(e) => {onchange(e)}} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" />
                    <span class="form-error">{error.email}</span>
                  </div>
               
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => {
                        handleSubmit();
                      }} >Forgot Password</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      {/* <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label> */}
                    </div>
                    <Link to="/login" className="auth-link text-black">Sign in to continue</Link>

                  </div>
                  {/* <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2" />Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <a href="register.html" className="text-primary">Create</a>
                  </div> */}
              
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
    );
};

export default Login;