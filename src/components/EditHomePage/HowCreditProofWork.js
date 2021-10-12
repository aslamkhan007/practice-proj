

import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/EditHomePageApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import { Link, useParams } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import { Loader } from "../common/Loader/loader";
/**
 * 
 * @author prabhakar sarkar 
 * @returns 
 */
const HowCreditProofWorks = (props) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const [registerYourselfEnglish, setRegisterYourselfEnglish] = useState('')
    const [registerYourselfFrench, setRegisterYourselfFrench] = useState('')

    const [verifyCreditscoreEnglish, setVerifyCreditscoreEnglish] = useState("")
    const [verifyCreditscoreFrench, setVerifyCreditscoreFrench] = useState("")

    const [reviewYourlandlordEnglish, setReviewYourlandlordEnglish] = useState("")
    const [reviewYourlandlordFrench, setReviewYourlandlordFrench] = useState("")

    const [registerYourselfImage, setRegisterYourselfImage] = useState('')

    const [verifyCreditscoreImage, setVerifyCreditscoreImage] = useState('')

    const [reviewYourlandlordImage, setReviewYourlandlordImage] = useState('')

    const [homwPageId, setHomePageId] = useState('')
    const handleImage1 = (e) => {
        const fileValid = e.target.files[0].type
        if (fileValid == "image/png" || fileValid == "image/jpg" ||
            fileValid == "image/jpeg") {
            setRegisterYourselfImage(e.target.files[0])
            console.log(e.target.files[0]);
        } else {
            CreateNotification('warning', "please selete photo")
        }

    }

    const handleImage2 = (e) => {
        const fileValid = e.target.files[0].type
        if (fileValid == "image/png" || fileValid == "image/jpg" ||
            fileValid == "image/jpeg") {
                setVerifyCreditscoreImage(e.target.files[0])
            console.log(e.target.files[0]);
        } else {
            CreateNotification('warning', "please selete photo")
        }   
    }
    const handleImage3 = (e) => {
        
        const fileValid = e.target.files[0].type
        if (fileValid == "image/png" || fileValid == "image/jpg" ||
            fileValid == "image/jpeg") {
                setReviewYourlandlordImage(e.target.files[0])
            console.log(e.target.files[0]);
        } else {
            CreateNotification('warning', "please selete photo")
        }

    }

    const isFormValid = (e) => {

        let error = {};

        let formIsValid = true;
console.log(registerYourselfImage,"fgggggggggggggggggggggggggggggggg");
        if (!registerYourselfEnglish || !registerYourselfEnglish.trim()) {
            formIsValid = false;
            error['registerYourselfEnglish'] = "Please Enter  Register Yourself Text In English "
        }
        if (!registerYourselfFrench || !registerYourselfFrench.trim()) {
            formIsValid = false;
            error['registerYourselfFrench'] = "Please Enter  Register Yourself Text In French "
        }
 
        if (!verifyCreditscoreEnglish || !verifyCreditscoreEnglish.trim()) {
            formIsValid = false
            error['verifyCreditscoreEnglish'] = "Please Enter Verify Credit Score Text In English"
        }
    
        if (!verifyCreditscoreFrench || !verifyCreditscoreFrench.trim()) {
            formIsValid = false;
            error['verifyCreditscoreFrench'] = "Please Enter Verify Credit Score Text In French"
        }
        if (!reviewYourlandlordEnglish || !reviewYourlandlordEnglish.trim()) {
            formIsValid = false;
            error['reviewYourlandlordEnglish'] = "Please Enter Review Your Landlord Text In English"
        }
     
        if (!reviewYourlandlordFrench || !reviewYourlandlordFrench.trim()) {
            formIsValid = false;
            error['reviewYourlandlordFrench'] = "Please Select review Your landlord In French"
        } 




        if (!registerYourselfImage ) {
            formIsValid = false;
            error['registerYourselfImage'] = "Please Select Register Yourself Image "
        }
        if (!verifyCreditscoreImage) {
            formIsValid = false;
            error['verifyCreditscoreImage'] = "Please Select verify Credit Score Image"
        }
        if (!reviewYourlandlordImage) {
            formIsValid = false;
            error['reviewYourlandlordImage'] = "Please Enter Review Your Landlord Image"
        }
        setErrors(error)
        return formIsValid;
    }


    const EditHomepage = async () => {
        console.log("hello");
        const isValid = await isFormValid();
        if (isValid) {
        
            let formData = new FormData();
            formData.append("registerYourselfEnglish", registerYourselfEnglish)
            formData.append("registerYourselfFrench", registerYourselfFrench)

            formData.append("reviewYourlandlordEnglish", reviewYourlandlordEnglish)
            formData.append("reviewYourlandlordFrench", reviewYourlandlordFrench)
            
            formData.append("verifyCreditscoreFrench", verifyCreditscoreFrench)
            formData.append("verifyCreditscoreEnglish", verifyCreditscoreEnglish)
     
            formData.append("registerYourselfImage", registerYourselfImage)
            formData.append("verifyCreditscoreImage", verifyCreditscoreImage)
            formData.append("reviewYourlandlordImage", reviewYourlandlordImage)
            
            formData.append("homwPageId", homwPageId)
            const Response = await USERAPI.updateHowCreditproofworksApi(formData);
            if (Response.data.status == 200) {
                let allData = Response && Response.data && Response.data.data
                CreateNotification("success", "Credit Proof Work   Updated Successfully")
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

    const getHomePageDataFun = async () => {
        const Response = await USERAPI.getHomePageDataAPI();
        // console.log(Response,"tttttttttttttttttttttttttttttttttttttttttttt");
        if (Response.data.status == 200) {
            const allData = Response && Response.data && Response.data.data
            //   console.log(allData[0].creditProofServicesEnglish,"hello");
            setRegisterYourselfEnglish(allData.registerYourselfEnglish)
            setRegisterYourselfFrench(allData.registerYourselfFrench)

            setVerifyCreditscoreEnglish(allData.verifyCreditscoreEnglish)   
            setVerifyCreditscoreFrench(allData.verifyCreditscoreFrench)
            
            setReviewYourlandlordEnglish(allData.reviewYourlandlordEnglish)
            setReviewYourlandlordFrench(allData.reviewYourlandlordFrench)

            setRegisterYourselfImage(allData.registerYourselfImage)
            setVerifyCreditscoreImage(allData.verifyCreditscoreImage)
            setReviewYourlandlordImage(allData.reviewYourlandlordImage)
            setHomePageId(allData._id)
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
                                <h3>How Credit Proof Works</h3>
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
                                    <label for="fullName">Register your self Text In English</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={registerYourselfEnglish}
                                        onChange={(e) => setRegisterYourselfEnglish(e.target.value)}
                                    >  </textarea>
                                    <p className="error_mesage"> {errors.registerYourselfEnglish} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Register your self  Text In French</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={registerYourselfFrench}
                                        onChange={(e) => setRegisterYourselfFrench(e.target.value)}
                                    ></textarea>
                                    <p className="error_mesage"> {errors.registerYourselfFrench} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Verify credit score  Text In English</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={verifyCreditscoreEnglish}
                                        onChange={(e) => setVerifyCreditscoreEnglish(e.target.value)}
                                    >  </textarea>
                                    <p className="error_mesage"> {errors.verifyCreditscoreEnglish} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Verify credit score  Text In French</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={verifyCreditscoreFrench}
                                        onChange={(e) => setVerifyCreditscoreFrench(e.target.value)}
                                    ></textarea>
                                    <p className="error_mesage"> {errors.verifyCreditscoreFrench} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Review your landlord Text In English</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={reviewYourlandlordEnglish}
                                        onChange={(e) => setReviewYourlandlordEnglish(e.target.value)}
                                    >  </textarea>
                                    <p className="error_mesage"> {errors.reviewYourlandlordEnglish} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Review your landlord  Text In French</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={reviewYourlandlordFrench}
                                        onChange={(e) => setReviewYourlandlordFrench(e.target.value)}
                                    ></textarea>
                                    <p className="error_mesage"> {errors.reviewYourlandlordFrench} </p>
                                </div>
                                <div className="form-group fullNameSec browseSec col-4">
                                    <label>Upload Register your self Image</label>
                                    <label className="uploadBtn" for="upload">
                                        <span className="uploadIcon"><i className="fa fa-upload" aria-hidden="true"></i></span>
                                        <input  class="isVisuallyHidden1"  type="file"
                                            onChange={handleImage1}
                                        />
                                        <p className="m-0">upload</p>
                                    </label>
                                    <p className="error_mesage"> {errors.registerYourselfImage} </p>
                                </div>
                                <div className="form-group fullNameSec browseSec col-4">
                                    <label>Upload Verify credit score Image</label>
                                    <label className="uploadBtn" for="upload">
                                        <span className="uploadIcon"><i className="fa fa-upload" aria-hidden="true"></i></span>
                                        <input  class="isVisuallyHidden1"  type="file"
                                            onChange={handleImage2}
                                        />
                                        <p className="m-0">upload</p>
                                    </label>
                                    <p className="error_mesage"> {errors.verifyCreditscoreImage} </p>
                                </div>
                                <div className="form-group fullNameSec browseSec col-4">
                                    <label>Upload Review your landlord Image</label>
                                    <label className="uploadBtn" for="upload">
                                        <span className="uploadIcon"><i className="fa fa-upload" aria-hidden="true"></i></span>
                                        <input class="isVisuallyHidden1"  type="file"
                                            onChange={handleImage3}
                                        />
                                        <p className="m-0">Upload</p>
                                    </label>
                                    <p className="error_mesage"> {errors.reviewYourlandlordImage} </p>
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

export default HowCreditProofWorks;

