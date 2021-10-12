import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import * as TENANTAPI from "../../api/TenantApi";
import { CreateNotification } from "../../Utils/notification";
import { Link } from "react-router-dom";
import { Loader } from "../common/Loader/loader";


const RentReport = (props) => {
    const { landlordId } = useParams()
    const [data, setData] = useState();
    const [loading, setLoding] = useState(true)
    const [totalData, setTotalData] = useState()

    const getTenantRentReport = async (landlordId) => {
        // console.log(landlordId, "ppppppppppppppppppppppppppppp");
        const Response = await TENANTAPI.getTenantRentReportApi(landlordId);
        if (Response.data.status == 200) {
            console.log(Response.data.data, "jjjjjjjjjjjjjjjjjjjjjjjxschschsshdjshdjshdjshjdsjhd");

            setData(Response.data.data);
            setTotalData(Response.data.count)
            setTimeout(() => {
                setLoding(false)
            }, 1000)
        }
        else if (Response.data.status == 401) {
            CreateNotification("danger", "Session has been expired!");
            localStorage.clear();
            props.history.push('/login')
            setTimeout(() => {
                setLoding(false)
            }, 1000)
        }
        else {
            CreateNotification("danger", "Something went wrong, please try again later!")
            setTimeout(() => {
                // setLoding(false)
            }, 1000)
        }
    }
    useEffect(() => {
        getTenantRentReport(landlordId);
        // localStorage.setItem("landlordId",landlordId)
    }, [landlordId]);
    return (
        <React.Fragment>
            <div className="row shadow py-2 mb-3 bg-white rounded">
                <div className="col-md-12 grid-margin">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="d-flex align-items-end flex-wrap">
                            <div className="mr-md-3 mr-xl-5">
                                <h3 className="text-center mt-1 ">Tenant  List </h3>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-end flex-wrap">
                            <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/User">Landlord List</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-2 ">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card user-list-table ">
                        <div className="card-body ">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="bg-primary ">
                                        <tr className="text-center">
                                           
                                            <th  className="text-center">Name</th>
                                            <th  className="text-center">Email</th>
                                            <th  className="text-center">PhoneNumber</th>
                                            <th  className="text-center">Address</th>
                                            <th  className="text-center">Units</th>
                                            <th  className="text-center">Month</th>
                                            <th  className="text-center">Balance</th>
                                            <th  className="text-center">Status</th>
                                        </tr>
                                    </thead>
                                    {data && data.length > 0 ?
                                        <tbody>
                                            {data && data.length > 0 && data.map((value, index) => {
                                                return (
                                                    <tr>
                                                    
                                                            <td>
                                                                {value.allTenantData && value.allTenantData && value.allTenantData.map((item, index) => {
                                                                    return (
                                                                        <li>Tenant{" "}{index + 1} -{" "}{item.FirstName + " " + item.LastName}</li>
                                                                    )
                                                                })}
                                                            </td>
                                                            <td>
                                                                {value.allTenantData && value.allTenantData && value.allTenantData.map((item, index) => {
                                                                    return (
                                                                        <li>Email{" "}{index + 1} -{" "}{item.Email}</li>
                                                                    )
                                                                })}
                                                            </td>
                                                            <td>
                                                                {value.allTenantData && value.allTenantData && value.allTenantData.map((item, index) => {
                                                                    return (
                                                                        <React.Fragment>
                                                                        <li>{item.phoneNumber}</li> <br/></React.Fragment>
                                                                    )
                                                                })}
                                                            </td>
                                                            <td>
                                                                {value.selectProperties}
                                                            </td>
                                                            <td>
                                                                {value.Units}
                                                            </td>
                                                            <td>
                                                                {value.Month ? value.Month : <p style={{color:"red"}}>Month is not updated yet</p>}
                                                            </td>
                                                            <td>
                                                                {value.Balance ? value.Balance : <p style={{color:"red"}}>Balance is not updated yet</p>}
                                                            </td>
                                                            <td>
                                                                {value.Status ? value.Status : <p style={{color:"red"}}>Status is not updated yet</p>}
                                                            </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                        : <h3 className="text notFound">Landlord has not added any tenant yet</h3>}
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

export default RentReport
// <div className="row">
// <div className="form-group fullNameSec col-8">
//     <input type="text" class="form-control" placeholder="Search"
//     ></input>
// </div>
// <div class="signInBtnSec col-3">
//     <button type="submit" class="btn btn-get-started text-center" > SEARCH</button>
// </div>
// </div>
// <select
// className=" w-200"
// >
// <option value="" disabled selected
// ></option>
// <option className="dropdown-item" value={3}>3</option>
// <option className="dropdown-item" value={10}>10</option>
// <option className="dropdown-item" value={30} >30</option>
// </select>