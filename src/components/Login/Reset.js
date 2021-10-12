import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/AuthApi";
import { CreateNotification } from "../../Utils/notification";
import { Link, useParams } from "react-router-dom";

const Login = (props) => {
  const {resetToken} = useParams()
  const [error, setError] = useState({});
  const [data, setData] = useState({confirmPassword:'',password:'',resetToken:resetToken});

  const isFormValid = () => {
    if (!data.password) {
       setError({ password: "New password is required!"});
         return false;
     }
     else if (!data.password) {
       setError({ confirmPassword: "Verify password is required!"});
         return false;
     }
     else if (data.confirmPassword != data.password) {
       setError({ confirmPassword: "New password and verify password do not match"});
         return false;
     }
     else {
       setError({});
         return true;
     }
 }

  const handleSubmit = async() =>
  {
    const isValid = await isFormValid();

    if(isValid)
    {
      const loginResponse = await USERAPI.ResetAPI(data);
      if(loginResponse.data.status == 200)
      {
      CreateNotification("success",loginResponse.data.message)
      props.history.push('/login')

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
    console.log( event.target," event.target event.target");
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
   
  }

  useEffect(async()=>{
    
    setData(prevState => ({ ...prevState, ['user_id']: props.match.params.user_id,['pw_token']: props.match.params.pw_token }));
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
                <h4 className="centre form-group">Reset Password</h4>
                {/* <h6 className="font-weight-light">Sign in to continue.</h6> */}
                
                  <div className="form-group">
                    <input className="form-control form-control-lg" type="password" id="password" placeholder="New password" name="password" onChange={(e) => {onchange(e)}} />
                          <span class="form-error">{error.password}</span>
                  </div>
                  <div className="form-group">
                    <input className="form-control form-control-lg" type="password" id="confirmPassword" placeholder="confirmPassword password" name="confirmPassword" onChange={(e) => {onchange(e)}} />
                          <span class="form-error">{error.confirmPassword}</span>
                  </div>
               
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => {
                        handleSubmit();
                      }} >Reset Password</button>
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