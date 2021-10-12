import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import { Link, useParams } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import { Loader } from "../common/Loader/loader";
const Dashboard = (props) => {
  const { id } = useParams()
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState([])
  const [address2, setAddress2] = useState('')
  const [FirstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState('')
  let landlordId = localStorage.getItem("landlordId")


  
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyA2SLnbBZFr3bo3mL5g6QiWAstdUuKaq30",
    onPlaceSelected: (place) => {
      console.log(place, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      setAddress(place.formatted_address)
    },
    options: {
      types: ["establishment"],

    },
  });

  const getUserById = async (id) => {
    const Response = await USERAPI.getUserByIdAPI(id);
    // console.log(Response.data.data,"nnnnnnnnnnnnnnnnnnn");

    if (Response.data.status == 200) {
      let allData = Response && Response.data && Response.data.data
      setFullName(allData.fullName)
      setPhoneNumber(allData.phoneNumber)
      setEmail(allData.email)
      setCountry(allData.country)
      setPostalCode(allData.postalCode)
      setAddress(allData.address)
      setProvince(allData.province)
      setCity(allData.city)
      setUserId(allData._id)
      setFirstName(allData.FirstName)
      setLastName(allData.lastName)


      setLoading(false)
    }
    else if (Response.data.status == 401) {
      CreateNotification("danger", "Session has been expired!")
      localStorage.clear();
      props.history.push('/login')
    }
    else {
      CreateNotification("danger", "Something went wrong, please try again later!")
    }

  }

  useEffect(async () => {
    getUserById(id);
  }, []);



  const isFormValidLandlord = (e) => {

    let error = {};

    let formIsValid = true;
    const domain = /^[a-zA-Z0-9]+$/
    const regexTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const mobPattern = /^[0-9]{12}$/


    if (!fullName || !fullName.trim()) {
      formIsValid = false;
      error['fullName'] = "Please Enter your fullName "
    }
    if (!email || !email.trim()) {
      formIsValid = false;
      error['email'] = "Please Enter your Email"
    }
    if (email && regexTest.test(email) === false) {
      console.log('regex test', regexTest.test(email))
      formIsValid = false
      error['email'] = "Please Enter your valid Email "
    }
    if (!phoneNumber && !phoneNumber.trim()) {
      formIsValid = false
      error['phoneNumber'] = "Please Enter your Phone Number"
    }
    if (!phoneNumber || phoneNumber.trim().length !== 10) {
      formIsValid = false
      error['phoneNumber'] = "Please Enter your valid Phone Number"
    }
    if (!address || !address.trim()) {
      formIsValid = false;
      error['address'] = "please Enter your Address"
    }
    if (!city || !city.trim()) {
      formIsValid = false;
      error['city'] = "Please Enter your City"
    }
    if (!province || !province.trim()) {
      formIsValid = false;
      error['province'] = "Please Enter your Province"
    }
    if (!postalCode || !postalCode.trim()) {
      formIsValid = false;
      error['postalCode'] = "Please Enter your Postal code"
    }
    if (!country || !country.trim()) {
      formIsValid = false;
      error['country'] = "Please Enter your Country"


    }
    setErrors(error)
    return formIsValid;
  }
  const isFormValidTenant = (e) => {

    let error = {};

    let formIsValid = true;
    const domain = /^[a-zA-Z0-9]+$/
    const regexTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const mobPattern = /^[0-9]{12}$/

    if (!FirstName || !FirstName.trim()) {
      formIsValid = false;
      error['FirstName'] = "Please Enter your FirstName "
    }
    if (!lastName || !lastName.trim()) {
      formIsValid = false;
      error['lastName'] = "Please Enter your LastName "
    }
    if (!email || !email.trim()) {
      formIsValid = false;
      error['email'] = "Please Enter your Email"
    }
    if (email && regexTest.test(email) === false) {
      console.log('regex test', regexTest.test(email))
      formIsValid = false
      error['email'] = "Please Enter your valid Email "
    }
    if (!phoneNumber && !phoneNumber.trim()) {
      formIsValid = false
      error['phoneNumber'] = "Please Enter your Phone Number"
    }
    if (!phoneNumber || phoneNumber.trim().length !== 10) {
      formIsValid = false
      error['phoneNumber'] = "Please Enter your valid Phone Number"
    }
    if (!address || !address.trim()) {
      formIsValid = false;
      error['address'] = "please Enter your Address"
    }
    if (!city || !city.trim()) {
      formIsValid = false;
      error['city'] = "Please Enter your City"
    }
    if (!province || !province.trim()) {
      formIsValid = false;
      error['province'] = "Please Enter your Province"
    }
    if (!postalCode || !postalCode.trim()) {
      formIsValid = false;
      error['postalCode'] = "Please Enter your Postal code"
    }
    if (!country || !country.trim()) {
      formIsValid = false;
      error['country'] = "Please Enter your Country"


    }
    setErrors(error)
    return formIsValid;
  }
  const updateUserFun = async () => {
    if (lastName && FirstName) {
      const isValid = await isFormValidTenant();
      if (isValid) {
        const data = {
          lastName,
          FirstName,
          email,
          phoneNumber,
          province,
          city,
          country,
          postalCode
        }
        const Response = await USERAPI.UpdateUserApi(data, userId);
        if (Response.data.status == 200) {

          CreateNotification("success", "Tenant updated successfully")
          setTimeout(() => {
            props.history.push(`/Tenant/${landlordId}`)
          }, 3000)
          setLoading(false)
        }
        else if (Response.data.status == 401) {
          CreateNotification("danger", "Session has been expired!")
          localStorage.clear();
          props.history.push('/login')
        }
        else {
          CreateNotification("danger", Response.data.message)
        }
      }
    } else {
      const isValid = await isFormValidLandlord();
      if (isValid) {
        const data = {
          fullName,
          email,
          phoneNumber,
          province,
          city,
          country,
          postalCode
        }
        const Response = await USERAPI.UpdateUserApi(data, userId);
        if (Response.data.status == 200) {
          CreateNotification("success", "landLoad updated successfully")
          setTimeout(() => {
            props.history.push("/User")
          }, 3000)
          setLoading(false)
        }
        else if (Response.data.status == 401) {
          CreateNotification("danger", "Session has been expired!")
          localStorage.clear();
          props.history.push('/login')
        }
        else {
          CreateNotification("danger", Response.data.message)
        }
      }

    }
  }
  return (
    <React.Fragment>
      {FirstName && lastName ? <React.Fragment>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex align-items-end flex-wrap">
                <div className="mr-md-3 mr-xl-5">
                  <h3>Edit Tanent</h3>
                </div>

              </div>
              <div className="d-flex justify-content-between align-items-end flex-wrap">
                <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to={`/Tenant/${landlordId}`}>Tenant List</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="form-group fullNameSec col-6">
                    <label for="fullName">FirstName</label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter full name"
                      value={FirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <p className="error_mesage"> {errors.FirstName} </p>
                  </div>
                  <div className="form-group fullNameSec col-6">
                    <label for="fullName">LastName</label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter full name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <p className="error_mesage"> {errors.lastName} </p>
                  </div>
                  <div className="form-group fullNameSec col-6">
                    <label for="email">Email address</label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} readOnly

                    ></input>
                    <p className="error_mesage"> {errors.email} </p>
                  </div>

                  <div className="form-group fullNameSec col-6">
                    <label for="phone">Phone Number</label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    ></input>
                    <p className="error_mesage"> {errors.phoneNumber} </p>
                  </div>
                  <div className="form-group fullNameSec col-6">
                    <label for="city">Address</label>
                    <input ref={ref} type="text"
                      class="form-control"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                    <p className="error_mesage"> {errors.address} </p>
                  </div>
                  <div className="form-group fullNameSec col-6">
                    <label for="city">City</label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    ></input>
                    <p className="error_mesage"> {errors.city} </p>
                  </div>
                  <div className="form-group fullNameSec col-6">
                    <label for="country">Country </label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    ></input>
                    <p className="error_mesage"> {errors.country} </p>
                  </div>
                  <div className="form-group fullNameSec col-6">
                    <label for="country">Postal Code</label>
                    <input type="text"
                      class="form-control"
                      placeholder="Enter Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></input>
                    <p className="error_mesage"> {errors.postalCode} </p>
                  </div>
                  <div className="form-group addressSec col-6">
                    <label>Province  </label>
                    <input type="text"
                      className="form-control"
                      placeholder="Enter your province"
                      value={province}a
                      onChange={(e) => setProvince(e.target.value)}
                    />
                    <p className="error_mesage"> {errors.province} </p>
                  </div>
                  <div className="form-group addressSec col-6">
                    <label for="email">Po Box {" "}|{" "}
                      Apartment | {"  "}Suite </label>
                    <input type="text"
                      className="form-control"
                      placeholder="please enter you Po Box, Apartment, Suite"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)} />
                  </div>


                  <br />
                </div>
                <button type="submit" class="btn btn-primary mr-2" onClick={(e) => updateUserFun(e)}>Update</button>
              </div>

            </div>
          </div>
        </div> </React.Fragment> :
        <React.Fragment>
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="d-flex justify-content-between flex-wrap">
                <div className="d-flex align-items-end flex-wrap">
                  <div className="mr-md-3 mr-xl-5">
                    <h3>Edit Landlord</h3>
                  </div>

                </div>
                <div className="d-flex justify-content-between align-items-end flex-wrap">
                  <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/User">User List</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="form-group fullNameSec col-6">
                      <label for="fullName">FullName</label>
                      <input type="text"
                        class="form-control"
                        placeholder="Enter full name"
                        value={fullName ? fullName : FirstName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <p className="error_mesage"> {errors.fullName} </p>
                    </div>
                    <div className="form-group fullNameSec col-6">
                      <label for="email">Email Address</label>
                      <input type="text"
                        class="form-control"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} readOnly

                      ></input>
                      <p className="error_mesage"> {errors.email} </p>
                    </div>

                    <div className="form-group fullNameSec col-6">
                      <label for="phone">Phone Number</label>
                      <input type="text"
                        class="form-control"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      ></input>
                      <p className="error_mesage"> {errors.phoneNumber} </p>
                    </div>
                    <div className="form-group fullNameSec col-6">
                      <label for="city">Address</label>
                      <input ref={ref} type="text"
                        class="form-control"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></input>
                      <p className="error_mesage"> {errors.address} </p>
                    </div>
                    <div className="form-group fullNameSec col-6">
                      <label for="city">City</label>
                      <input type="text"
                        class="form-control"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      ></input>
                      <p className="error_mesage"> {errors.city} </p>
                    </div>
                    <div className="form-group fullNameSec col-6">
                      <label for="country">Country </label>
                      <input type="text"
                        class="form-control"
                        placeholder="Enter Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      ></input>
                      <p className="error_mesage"> {errors.country} </p>
                    </div>
                    <div className="form-group fullNameSec col-6">
                      <label for="country">Postal Code</label>
                      <input type="text"
                        class="form-control"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      ></input>
                      <p className="error_mesage"> {errors.postalCode} </p>
                    </div>
                    <div className="form-group addressSec col-6">
                      <label>Province  </label>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter your province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                      />
                      <p className="error_mesage"> {errors.province} </p>
                    </div>
                    <div className="form-group addressSec col-6">
                      <label for="email">Po Box {" "}|{" "}
                        Apartment | {"  "}Suite </label>
                      <input type="text"
                        className="form-control"
                        placeholder="please enter you Po Box, Apartment, Suite"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                    <br />
                  </div>
                  <button type="submit" class="btn btn-primary mr-2" onClick={(e) => updateUserFun(e)}>Update</button>
                </div>
              </div>
            </div>
          </div> </React.Fragment>}
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};

export default Dashboard;


// <div  className="form-group browseSec">
// <label>Upload profile image</label>
// <label className="uploadBtn" for="upload">
//     <span className="uploadIcon"><i className="fa fa-upload" aria-hidden="true"></i></span>
//     <input  class="isVisuallyHidden" id="upload" type="file" 
//     onChange={handleProfileImage}
//     />
//     <p className="m-0">upload</p>
// </label>
// <p className="error_mesage"> {errors.selectMultipulDocument} </p>
// </div>