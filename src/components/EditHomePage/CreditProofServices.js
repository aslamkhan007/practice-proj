


import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/EditHomePageApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import { Link, useParams } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import { Loader } from "../common/Loader/loader";
const EditHomePage = (props) => {

 
    const [loading, setLoading] = useState(false)
    const [creditProofServicesEnglish, setCreditProofServicesEnglish] = useState('')
    const [creditProofServicesFrench, setCreditProofServicesFrench] = useState('')
    const [creditProofServicesImage, setCreditProofServicesImage] = useState("")
    const [errors, setErrors] = useState([])




    const isFormValid = (e) => {
        let error = {};
        let formIsValid = true;
        if (!creditProofServicesEnglish || !creditProofServicesEnglish.trim()) {
            formIsValid = false;
            error['creditProofServicesEnglish'] = "Please Enter your Credit Proof Services English"
        }
        if (!creditProofServicesFrench || !creditProofServicesFrench.trim()) {
            formIsValid = false;
            error['creditProofServicesFrench'] = "Please Enter your Credit Proof Services French"
        }
        if (!creditProofServicesImage && !creditProofServicesImage.trim()) {
            formIsValid = false
            error['creditProofServicesImage'] = "Please select your Credit Proof Services Image"
        }
        setErrors(error)
        return formIsValid;
    }

    const handleProfileImage = (e) => {
        const fileValid = e.target.files[0].type
        if (fileValid == "image/png" || fileValid == "image/jpg" ||
            fileValid == "image/jpeg") {
            setCreditProofServicesImage(e.target.files[0])
            console.log(e.target.files[0]);
        } else {
            CreateNotification('warning', "please selete photo")
        }

    }
    const EditHomepage = async () => {
        console.log(creditProofServicesImage,"sssssssss");
        const isValid = await isFormValid();
      
        if(isValid){
            if(creditProofServicesImage){
                let formData = new FormData();
                formData.append("creditProofServicesImage", creditProofServicesImage)
                formData.append("creditProofServicesEnglish", creditProofServicesEnglish)
                formData.append("creditProofServicesFrench", creditProofServicesFrench)
                const Response = await USERAPI.UpdateHomePageAPI(formData);
                if (Response.data.status == 200) {
                    let allData = Response && Response.data && Response.data.data
                    CreateNotification("success", "Credit Proof Service Text Update Successfully")
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
            }else{
                console.log(creditProofServicesImage,"nnnnnnnnnnnnn");
                let formData = new FormData();
                formData.append("creditProofServicesEnglish", creditProofServicesEnglish)
                formData.append("creditProofServicesFrench", creditProofServicesFrench)
                const Response = await USERAPI.UpdateHomePageAPI(formData);
                if (Response.data.status == 200) {
                    let allData = Response && Response.data && Response.data.data
                    CreateNotification("success", "Credit Proof Service Text Update Successfully")
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
          
        }
      
    }

    const getHomePageDataFun = async () => {
        const Response = await USERAPI.getHomePageDataAPI();
        // console.log(Response,"tttttttttttttttttttttttttttttttttttttttttttt");
        if (Response.data.status == 200) {
       
          const allData = Response && Response.data && Response.data.data
          console.log(allData.creditProofServicesImage,"hellosxsssssssssssssssssssssssssssssssssssssss  ");
            setCreditProofServicesEnglish(allData.creditProofServicesEnglish)
            setCreditProofServicesFrench(allData.creditProofServicesFrench)
            setCreditProofServicesImage(allData.creditProofServicesImage)
                  
        }
        else if (Response.data.status == 401) {
          CreateNotification("danger", "Session has been expired!");
          localStorage.clear();
          props.history.push('/login')
        }
        else {
          CreateNotification("danger", "Something went wrong, please try again later!")
        }
    
      }

    useEffect(async () => {
        getHomePageDataFun();
      }, []);
    

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="d-flex align-items-end flex-wrap">
                            <div className="mr-md-3 mr-xl-5">
                                <h3>Credit Proof Services</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body home-page-admin-form">
                            <div className="row">
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Credit Proof Services Text In English</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={creditProofServicesEnglish}
                                        onChange={(e) => setCreditProofServicesEnglish(e.target.value)}
                                    >  </textarea>
                                    <p className="error_mesage"> {errors.creditProofServicesEnglish} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Credit Proof Services Text In French</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={creditProofServicesFrench}
                                        onChange={(e) => setCreditProofServicesFrench(e.target.value)}
                                    ></textarea>
                                    <p className="error_mesage"> {errors.creditProofServicesFrench} </p>
                                </div>
                                <div className="form-group fullNameSec browseSec col-6">
                                    <label>Upload Credit Proof Services Image</label>
                                    <label className="uploadBtn" for="upload">
                                        <span className="uploadIcon"><i className="fa fa-upload" aria-hidden="true"></i></span>
                                        <input class="isVisuallyHidden1" id="upload" type="file"
                                     
                                            onChange={handleProfileImage}
                                        />
                                        <p className="m-0">Upload</p>
                                    </label>
                                    <p className="error_mesage"> {errors.creditProofServicesImage} </p>
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-update">
                                        <button onClick={() => EditHomepage()}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? <Loader /> : null}
        </React.Fragment>
    );
};

export default EditHomePage;


// <div className="form-group fullNameSec col-6">
// <label for="fullName">Test Imonials Text In English</label>
// <textarea type="text"
//     class="form-control"

//     value={testimonialsEnglish}
//     onChange={(e) => setTestimonialsEnglish(e.target.value)}

// >  </textarea>
// <p className="error_mesage"> {errors.FirstName} </p>
// </div>
// <div className="form-group fullNameSec col-6">
// <label for="fullName">Test Imonials Text In French</label>
// <textarea type="text"
//     class="form-control"

//     value={testimonialsFrench}
//     onChange={(e) => setTestimonialsFrench(e.target.value)}
// ></textarea>
// <p className="error_mesage"> {errors.creditProofServicesFrench} </p>
// </div>

// <div className="form-group fullNameSec col-6">
// <label for="fullName">Banner Heading Text In English</label>
// <textarea type="text"
//     class="form-control"
//     value={bannerheadingEnglish}
//     onChange={(e) => setBannerheadingEnglish(e.target.value)}
// >  </textarea>
// <p className="error_mesage"> {errors.FirstName} </p>
// </div>
// <div className="form-group fullNameSec col-6">
// <label for="fullName">Banner Heading Text  Text In French</label>
// <textarea type="text"
//     class="form-control"
//     value={bannerheadingFrench}
//     onChange={(e) => setBannerheadingFrench(e.target.value)}
// ></textarea>
// <p className="error_mesage"> {errors.creditProofServicesFrench} </p>
// </div>
// <div className="form-group fullNameSec col-6">
// <label for="fullName">banner Content   Text In English</label>
// <textarea type="text"
//     class="form-control"
//     value={bannerContentEnglish}
//     onChange={(e) => setBannerContenteEnglish(e.target.value)}
// >  </textarea>
// <p className="error_mesage"> {errors.FirstName} </p>
// </div>
// <div className="form-group fullNameSec col-6">
// <label for="fullName">banner Conten Text In French</label>
// <textarea type="text"
//     class="form-control"
//     value={bannerContentFrench}
//     onChange={(e) => setBannerContentFrench(e.target.value)}
// ></textarea>
// <p className="error_mesage"> {errors.creditProofServicesFrench} </p>
// </div>
