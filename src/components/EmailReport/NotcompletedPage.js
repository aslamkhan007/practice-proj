import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import { Loader } from "../common/Loader/loader";
const NotcompletedPage = () => {

    const [value, onChange] = useState(new Date());
    const [showCalendars, setShowCaledar] = useState(false)
    console.log(value, "kkkkkkkkkkkkkkkkkk");
    const [loding, setLoding] = useState(false)
    // const showCalendar = () => {
    //     console.log(showCalendars, "hello");
    //     showCalendars == false ? setShowCaledar(true) : setShowCaledar(false)
    // }
    useEffect(() => {
        setTimeout(() => {
            setLoding(true)
        }, 1000)


    }, [])
    return (
        <div>
            <React.Fragment>
                {loding ? <React.Fragment>
                    <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="d-flex justify-content-between flex-wrap">
                            <div className="d-flex align-items-end flex-wrap">
                                <div className="mr-md-3 mr-xl-5">
                                    <h3 className="text-center">Email  Not Send Report Page</h3>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-end flex-wrap">
                            <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/Email">Email Report Page</Link>
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
                    <button className="calender">
                    <div class="dropdown calendar-dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button"
                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Month
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div><Calendar onChange={onChange}
                                value={value} /></div>
                        </div>
                    </div>
                    </button>
                    <button class="btn btn-outline-primary" href="#">Year</button>
                      
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
        </div>
    )
}

export default NotcompletedPage
