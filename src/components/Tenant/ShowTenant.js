import React from 'react'
import { Link } from 'react-router-dom'

const ShowTenant = () => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="d-flex align-items-end flex-wrap">
                            <div className="mr-md-3 mr-xl-5">
                                <h3 className="text-center">Tenant  List </h3>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                            <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/User">Landlord List</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group fullNameSec col-8">
                    <input type="text" class="form-control" placeholder="Search"
                    ></input>
                </div>
                <div class="signInBtnSec col-3">
                    <button type="submit" class="btn btn-get-started text-center" > SEARCH</button>
                </div>
            </div>
            <select
                className=" w-200"
            >
                <option value="" disabled selected
                ></option>
                <option className="dropdown-item" value={3}>3</option>
                <option className="dropdown-item" value={10}>10</option>
                <option className="dropdown-item" value={30} >30</option>
            </select>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card user-list-table table-striped">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead className="bg-primary">
                                        <tr>
                                            <th> So No</th>
                                            <th>FirstName</th>
                                            <th>lastName</th>
                                            <th>Email</th>
                                            <th>PhoneNumber</th>
                                            <th>Address</th>
                                            <th>City</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>hello</td>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table_record_result">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ShowTenant
