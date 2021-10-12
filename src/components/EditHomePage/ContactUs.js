


import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/EditHomePageApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import { Link, useParams } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import { Loader } from "../common/Loader/loader";
const ContactUs = (props) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [creditProofServicesEnglish, setCreditProofServicesEnglish] = useState('')
    const [creditProofServicesFrench, setCreditProofServicesFrench] = useState('')
    const [errors, setErrors] = useState([])
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [linkedin, seTLinkedin] = useState('')
    const [homwPageId, setHomePageId] = useState('')


    const isFormValid = (e) => {

        let error = {};

        let formIsValid = true;
        const regexTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email || !email.trim()) {
            formIsValid = false;
            error['email'] = "Please Enter your Email"
        }
        if (email && regexTest.test(email) === false) {
            console.log('regex test', regexTest.test(email))
            formIsValid = false
            error['email'] = "Please Enter your valid Email "
        }
        if (!number && !number.trim()) {
            formIsValid = false
            error['number'] = "Please Enter your Phone Number"
        }
        if (!number || number.trim().length !== 10) {
            formIsValid = false
            error['number'] = "Please Enter your valid Phone Number"
        }
        if (!instagram || !instagram.trim()) {
            formIsValid = false;
            error['instagram'] = "please Enter your Instagram Link"
        }
        if (!facebook || !facebook.trim()) {
            formIsValid = false
            error['facebook'] = "Please Enter Your Facebook Link"
        }
        if (!twitter || !twitter.trim()) {
            formIsValid = false;
            error['twitter'] = "please Enter your Twitter Link"
        }
        if (!linkedin || !linkedin.trim()) {
            formIsValid = false;
            error['linkedin'] = "please Enter your linkedin Link"
        }
        setErrors(error)
        return formIsValid;
    }
    const EditHomepage = async () => {
        const isValid = await isFormValid();
        if (isValid) {
            const data = {
                number,
                email,
                linkedin,
                instagram,
                facebook,
                twitter,
                homwPageId


            }
            const Response = await USERAPI.UpdateContactPageAPI(data);
            if (Response.data.status == 200) {
                CreateNotification("success", "Credit Proof Contact Updated Successfully")
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
            setNumber(allData.number)
            setTwitter(allData.twitter)
            setInstagram(allData.instagram)
            setEmail(allData.email)
            setFacebook(allData.facebook)
            seTLinkedin(allData.linkedin)
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
                                    <label for="fullName">Phone Number</label>
                                    <input type="text"
                                        class="form-control"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.number} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Email</label>
                                    <input type="text"
                                        class="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.email} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">lnstagram Link</label>
                                    <input type="text"
                                        class="form-control"
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.instagram} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Facebook Link</label>
                                    <input type="text"
                                        class="form-control"
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.facebook} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Twitter Link</label>
                                    <input type="text"
                                        class="form-control"
                                        value={twitter}
                                        onChange={(e) => setTwitter(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.twitter} </p>
                                </div>
                                <div className="form-group fullNameSec col-6">
                                    <label for="fullName">Linkedin Link</label>
                                    <input type="text"
                                        class="form-control"
                                        value={linkedin}
                                        onChange={(e) => seTLinkedin(e.target.value)}
                                    />
                                    <p className="error_mesage"> {errors.linkedin} </p>
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

export default ContactUs;

