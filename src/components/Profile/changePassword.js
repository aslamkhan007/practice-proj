import React, { useState, useEffect,useContext } from "react";
import * as USERAPI from "../../api/userApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import {
  userContext,
} from "../../context/userContext";

const Dashboard = (props) => {
var  context = useContext(userContext);

  const [error, setError] = useState({});
  const [data, setData] = useState({});


  const isFormValid = () => {
    if (!data.oldPassword) {
      setError({ oldPassword: "Current password is required!"});
        return false;
    }
    else if (!data.newPassword) {
      setError({ newPassword: "New password is required!"});
        return false;
    }
    else if (!data.confirmPassword) {
      setError({ confirmPassword: "Verify password is required!"});
        return false;
    }
    else if (data.confirmPassword != data.newPassword) {
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
      let id = '';
      const Response = await USERAPI.changePwAPI(data);
      console.log(Response,"res rses rses rses");
    
      if(Response.data.status == 200)
      {
        CreateNotification("success",Response.data.message)
        // let userData = JSON.parse(localStorage.getItem('userData'));
        //   if(userData)
        //   {
        //     userData.data.fullName = fullName;
        //     localStorage.setItem("userData", JSON.stringify(userData));
        //   }
        // context.UpdateUserContext({...context.user,first_name:data.first_name,last_name:data.last_name});
      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")  
        localStorage.clear();
        props.history.push('/login') 
      }
      else
      {
      CreateNotification("danger",Response.data.message)
      }
    }
    
  }

  // const getSingleLicence = async() =>
  // {
  //   let id = '';
  //     const Response = await USERAPI.getSingleClientAPI(id);
    
  //     if(Response.data.status == 200)
  //     {
  //       setData(Response.data.data);
  //     }
  //     else if(Response.data.status == 401)
  //     {
  //     CreateNotification("danger","Session has been expired!")
  //       localStorage.clear();
  //       props.history.push('/login')
  //     }
  //     else
  //     {
  //     CreateNotification("danger","Something went wrong, please try again later!")
  //     }
     
  // }

  const onchange = async(event) =>
  {
    setError({});
   
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
   
  }

  // useEffect(async()=>{
  //   getSingleLicence();
  // },[]);

    return (
      <div className="col-12 grid-margin">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Change Password</h4>
   
         
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Current password</label>
                  <div className="col-sm-9">
                    <input type="password" name="oldPassword"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span class="form-error">{error.oldPassword}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">New password</label>
                  <div className="col-sm-9">
                    <input type="password" name="newPassword" onChange={(e) => {onchange(e)}} className="form-control" />
                    <span class="form-error">{error.newPassword}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Verify password</label>
                  <div className="col-sm-9">
                    <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={(e) => {onchange(e)}} className="form-control"/>
                    <span class="form-error">{error.confirmPassword}</span>

                  
                  </div>
                </div>
              </div>
            </div>
            

            <button type="submit" class="btn btn-primary mr-2" onClick={() => {handleSubmit()}}>Submit</button>
           
        
        </div>
      </div>
    </div>
    );
};

export default Dashboard;