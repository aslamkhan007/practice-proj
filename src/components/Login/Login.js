import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/AuthApi";
import { CreateNotification } from "../../Utils/notification";

import { Link } from "react-router-dom";


const Login = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({ email: '', password: '' });


  const isFormValid = () => {
    const { email, password, } = data;

    var regex_email = /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      setError({ email: "Email field is required!" });
      return false;
    }
    else if (email && !email.match(regex_email)) {
      setError({ email: "Enter a valid email" });
      return false;
    }
    else if (!password) {
      setError({ password: "Password field is required!" });
      return false;
    }
    else if (password && (password.length < 3)) {
      setError({ password: "Enter a valid Password." });
      return false;
    } else {
      setError({});
      return true;
    }

  }
  const handleSubmit = async () => {
    const isValid = await isFormValid();

    if (isValid) {
      const loginResponse = await USERAPI.LoginAPI(data);
      console.log(loginResponse.data.data, "NNNNNNNNNN");
      if (loginResponse.data.data.status == 200 && loginResponse.data.data) {
        CreateNotification("success", "Login Successfully")
        localStorage.setItem("token", loginResponse.data.data.token);
        localStorage.setItem("id", loginResponse.data.data.data._id)
        localStorage.setItem("userData", JSON.stringify(loginResponse.data.data));
        setTimeout(() => {
          props.history.push('/')
        }, 3000)


      }
      else {
        CreateNotification("danger", loginResponse.data.data.message)
      }
    }

    // props.history.push('/')
  }

  const onchange = async (event) => {
    setError({});

    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));

  }

  useEffect(async () => {

  }, []);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">

                </div>

                <img style={{
                  height: "60px", width: "100px", position: "relative",
                  left: "40%",
                  top:" -60px"
                }} src="/assets/images/logo.png" alt="profile" />

                <div className="form-group">
                  <input type="email" name="email" onChange={(e) => { onchange(e) }} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" />
                  <span class="form-error">{error.email}</span>
                </div>
                <div className="form-group">
                  <input type="password" name="password" onChange={(e) => { onchange(e) }} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                  <span class="form-error">{error.password}</span>
                </div>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => {
                    handleSubmit();
                  }} >SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                  </div>
                  <Link to="/forgot" className="auth-link text-black">Forgot password?</Link>
                </div>

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