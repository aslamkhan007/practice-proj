import React, { useState, useEffect,useContext } from "react";
import * as USERAPI from "../../api/userApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import {
  userContext,
} from "../../context/userContext";
import { usePlacesWidget } from "react-google-autocomplete";
const Dashboard = (props) => {
var  context = useContext(userContext);

 
  const [error, setError] = useState({});
  const [data, setData] = useState();
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const  [id,setId]=useState('')
  const [userId, setUserId]=useState(localStorage.getItem("id"))
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyA2SLnbBZFr3bo3mL5g6QiWAstdUuKaq30",
    onPlaceSelected: (place) => {
        console.log(place,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        setAddress(place.formatted_address)
        // Geocode.fromAddress(place.formatted_address).then(
        //     (response) => {
        //         const { lat, lng } = response.results[0].geometry.location;
        //         console.log(lat, lng);
        //         const Latlng = {
        //             lat, lng
        //         }
        //         setLatLng(Latlng)
        //         Geocode.fromLatLng(lat, lng).then(
        //             (response) => {
        //                 const address = response.results[0].formatted_address;
        //                 let city, state, country, postal_code;
        //                 for (let i = 0; i < response.results[0].address_components.length; i++) {
        //                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        //                         switch (response.results[0].address_components[i].types[j]) {
        //                             case "locality":
        //                                 city = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "administrative_area_level_1":
        //                                 state = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "country":
        //                                 country = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "postal_code":
        //                                 postal_code = response.results[0].address_components[i].long_name;
        //                                 break;
        //                         }
        //                     }
        //                 }
        //                 setCity(city)
        //                 setCountry(country)
        //                 setProvince(state)
        //                 setPostalCode(postal_code)
        //                 console.log(address);
        //             },
        //             (error) => {
        //                 console.error(error);
        //             }
        //         );
        //     },
        //     (error) => {
        //         console.error(error);
        //     }
        // );
    },
    options: {
        types: ["establishment"],

    },
});

  const isFormValid = () => {
    
    console.log(phoneNumber.length,"JJJJJJJJJJJJJ");
    var regex_email = /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobPattern = /^[0-9]{10}$/
    if (!fullName) {

      setError({ fullName: "First name is required!"});
        return false;
    }
    else if (!address) {
      setError({ address: "Last name is required!"});
        return false;
    }
    else if (!phoneNumber) {
      setError({ phoneNumber: "Last name is required!"});
        return false;
    }
    else if (phoneNumber && mobPattern.test(phoneNumber)===false) {
      setError({ phoneNumber: "Enter valid number!"});
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
      const data ={
        fullName,
        email,
        phoneNumber,
        email,
        address

      }
      const Response = await USERAPI.UpdateProfileAPI(data,id);
      if(Response.data.status == 200)
      {
        CreateNotification("success",Response.data.message)

        
        let userData = JSON.parse(localStorage.getItem('userData'));
        console.log(fullName,"jjj999999999999999999jjjjjjjjjjjjjjjjjj");
          if(userData)
          console.log(userData,"userData   userData");
          {
            userData.data.fullName = fullName;
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        context.UpdateUserContext({...context.user,fullName:fullName});
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

  const getSingleUser= async() =>
  {
      const Response = await  USERAPI.getUserById(userId)
      if(Response.data.status == 200){
        const userData = Response && Response.data && Response.data.data 
        setFullName(userData&& userData.fullName)
        setPhoneNumber(userData&& userData.phoneNumber)
        setEmail(userData&& userData.email)
        setAddress(userData&& userData.address)
        setId(userData&& userData._id)
      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger","Something went wrong, please try again later!")
      }
     
  }


  useEffect(async()=>{
    getSingleUser();
  },[]);


    return (
      <div className="col-12 grid-margin">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Profile update</h4>
   
         
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">fullName</label>
                  <div className="col-sm-9">
                    <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" />
                    <span class="form-error">{error.fullName}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">address</label>
                  <div className="col-sm-9">
                    <input ref={ref} type="text" name="address" value={address} min={1} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                    <span class="form-error">{error.address}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="text" name="no_collaborator" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" readOnly/>
                  
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-8"> 
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">phoneNumber</label>
                <div className="col-sm-9">
                  <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value
                    )} className="form-control" />
                  <span class="form-error">{error.phoneNumber}</span>
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