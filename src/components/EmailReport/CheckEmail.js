import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Loader } from "../common/Loader/loader";
const CheckEmail = () => {
    // <div  type="date">
    const [loding, setLoding] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoding(true)
        }, 1000)


    }, [])

    return (
        <React.Fragment>
        
        {loding ? <React.Fragment>
            <div className="row">

            <div className="col-md-12 grid-margin">
                <div className="d-flex justify-content-between flex-wrap">
                    <div className="d-flex align-items-end flex-wrap">
                        <div className="mr-md-3 mr-xl-5">
                            <h3 className="text-center">Email  Report Page </h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="row">
            <div className="fullNameSec col-8">
                <input type="text" class="form-control" placeholder="Search"

                ></input>
            </div>
            <div class="search-btn col-3">
                <button type="submit" class="btn btn-get-started text-center" > SEARCH</button>
            </div>
        </div>
        <div className="show-record">
            <label>Show Record</label>
            <select
                className=""
            >
                <option value="" disabled selected
                ></option>
                <option className="dropdown-item" value={10}>10</option>
                <option className="dropdown-item" value={20}>20</option>
                <option className="dropdown-item" value={30} >30</option>
            </select>
            <div className="check-email">
                <button class="btn btn-outline-primary mr-1" > <Link to={"/email-send-completed"}>Send Email</Link></button>
                <button class="btn btn-outline-primary " > <Link to={"/email-not-send"}>Not Send Email</Link> </button>
            </div> 
        </div>
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card user-list-table table-striped">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className="bg-primary">
                                    <tr>
                                        <th> Sr. No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>PhoneNumber</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th>Province</th>
                                        <th>PostalCode</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-info">Tenant</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table_record_result">
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </React.Fragment> :<Loader/>}
        </React.Fragment>
    )
}

export default CheckEmail



