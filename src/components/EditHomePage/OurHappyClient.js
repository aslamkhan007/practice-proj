


import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/EditHomePageApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import { Link, useParams } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import { Loader } from "../common/Loader/loader";
const OurHappyClient = (props) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [clientsName, setClientsName] = useState('')
    const [clientImage, setClientImage] = useState('')
    const [clientsTextInFrench, setClientsTextInFrench] = useState('')
    const [clientsTextInEnglish, setClientsTextInEnglish] = useState('')
    const [errors, setErrors] = useState([])



    const imageHandle = (e) => {
        const fileValid = e.target.files[0].type
        if (fileValid == "image/png" || fileValid == "image/jpg" ||
            fileValid == "image/jpeg") {
                setClientImage(e.target.files[0])
            console.log(e.target.files[0]);
        } else {
            CreateNotification('warning', "please selete photo")
        }
    }

    const isFormValid= (e) => {
        let error = {};
        let formIsValid = true;
        if (!clientsName || !clientsName.trim()) {
            formIsValid = false;
            error['clientsName'] = "Please Enter your clientsName "
        }
        if (!clientsTextInFrench || !clientsTextInFrench.trim()) {
            formIsValid = false;
            error['clientsTextInFrench'] = "Please Enter your Client Text InF rench"
        }
        if (!clientsTextInEnglish && !clientsTextInEnglish.trim()) {
            formIsValid = false
            error['clientsTextInEnglish'] = "Please Enter your Client Text In English"
        }   if (!clientImage && !clientImage.trim()) {
            formIsValid = false
            error['clientImage'] = "Please Enter your Client Image"
        }
        setErrors(error)
        return formIsValid;
    }
    const EditHomepage = async () => {
        const isValid = await isFormValid();
        if (isValid) {
        let formData = new FormData();
        formData.append("clientsName", clientsName)
        formData.append("clientsTextInFrench", clientsTextInFrench)
        formData.append("clientsTextInEnglish", clientsTextInEnglish)
        formData.append("clientImage", clientImage)
        const Response = await USERAPI.UpdateHappyClientPageAPI(formData);
        if (Response.data.status == 200) {
            CreateNotification("success", "Credit Proof Happy Updated Successfully")
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
            setClientsName(allData.clientsName)
            setClientsTextInFrench(allData.clientsTextInFrench)
            setClientsTextInEnglish(allData.clientsTextInEnglish)   
            setClientImage(clientImage)
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




    const updateUserFun = async () => {
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="d-flex align-items-end flex-wrap">
                            <div className="mr-md-3 mr-xl-5">
                                <h3>Add Our Happy Clients</h3>
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
                                    <label for="fullName">Our  Happy Clients Name</label>
                                    <input type="text"
                                        class="form-control"
                                        value={clientsName}
                                        onChange={(e) => setClientsName(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.clientsName} </p>
                                </div>
                                <div className="form-group fullNameSec browseSec col-6">
                                    <label>Upload Our Happy clients image</label>
                                    <label className="uploadBtn" for="upload">
                                        <span className="uploadIcon"><i className="fa fa-upload" aria-hidden="true"></i></span>
                                        <input class="isVisuallyHidden1" id="upload" type="file"
                                            onChange={imageHandle}
                                        />
                                        <p className="m-0">upload</p>
                                    </label>
                                    <p className="error_mesage"> {errors.clientImage} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Our Happy Clients Text In English</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={clientsTextInEnglish}
                                        onChange={(e) => setClientsTextInEnglish(e.target.value)}
                                    ></textarea>
                                    <p className="error_mesage"> {errors.clientsTextInEnglish} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Our Happy Clients Text In French</label>
                                    <textarea type="text"
                                        class="form-control"
                                        value={clientsTextInFrench}
                                        onChange={(e) => setClientsTextInFrench(e.target.value)}
                                    ></textarea>
                                    <p className="error_mesage"> {errors.clientsTextInFrench} </p>
                                </div>
                            </div>
                            <hr />
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

export default OurHappyClient;

