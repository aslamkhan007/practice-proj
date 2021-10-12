import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
// import * as CONFIG from "../../config.json";

import { CreateNotification } from "../../Utils/notification";
import { Link } from "react-router-dom";
import ConformDeleteuserComponent from "../common/DeleteModal";
import Pagination1 from "../common/Pagination";
import { Loader } from "../common/Loader/loader";
import { distanceAndSkiddingToXY } from "@popperjs/core/lib/modifiers/offset";
import { Delete } from "../Delete";

const ReadMore = ({ children }) => {
  const text = children;
  console.log(text[1], "hhhhhhhhhhhhhh");
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text[1].slice(0, 50) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? <p style={{ color: "blue" }}>...Read more</p> : <p style={{ color: "red" }}> Show less</p>}
      </span>
    </p>
  );
};

const User = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1)
  const [totalData, setTotalData] = useState()
  const [loading, setLoding] = useState(true)
  const [searchValue, setSearchValue] = useState()
  const [pageLimit,setPageLimit] = useState(10)

//pagination ka page
  const paginationFun = async (pagenumber) => {
    console.log(pagenumber, "pagenumberpagenumberpagenumberpagenumber");
    const Response = await USERAPI.getAllUser(pagenumber,pageLimit);
    
    if (Response.data.status == 200) {
      setData(Response.data.data);
      setTotalData(Response.data.count)
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

//getuser ka page
  const getuserFun = async (pageNumber) => {

    const Response = await USERAPI.getAllUser(pageNumber,pageLimit);
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
    }
    else {
      CreateNotification("danger", "Something went wrong, please try again later!")
    }

  }



  useEffect(async () => {
    getuserFun(pageNumber);
  }, []);

//Delete ka page
  //const deleteUserFun = async (id) => {
   // <Delete/>
    // window.confirm("Are you sure ?")
    //CreateNotification("danger", "Are you sure?");

    // const Response = await USERAPI.deleteUserApi(id);
    // // setLoding(true)
    // if (Response.data.status == 200) {
    //   // window.location.reload()
    //   const Response = await USERAPI.getAllUser(data);
    //   if (Response.data.status == 200) {
    //     setData(Response.data.data);
    //     // setTimeout(()=>{
    //     //   setLoding(false)
    //     // },1000)

    //   }
    //   else if (Response.data.status == 401) {
    //     CreateNotification("danger", "Session has been expired!");
    //     localStorage.clear();
    //     props.history.push('/login')
    //   }
    // }
    // else if (Response.data.status == 401) {
    //   CreateNotification("danger", "Session has been expired!");
    //   localStorage.clear();
    //   props.history.push('/login')
    // }
    // else {
    //   CreateNotification("danger", "Something went wrong, please try again later!")
    // }
  //}


//changeStatus ka page
  const changeStatusFun = async (id, status) => {


    const Response = await USERAPI.statusChangeApi(id, status);
    // setLoding(true)
    if (Response.data.status == 200) {
      const Response = await USERAPI.getAllUser(data);
      if (Response.data.status == 200) {
        setData(Response.data.data);
        // setTimeout(()=>{
        //   setLoding(false)
        // },1000)
      }
      else if (Response.data.status == 401) {
        CreateNotification("danger", "Session has been expired!");
        localStorage.clear();
        props.history.push('/login')
      }
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


//get tenant ka page

  const getTenantFun = (landlordId) => {
    
    props.history.push(`/Tenant/${landlordId}`)
  }

  const getTenantRentReport = (landlordId) => {
    props.history.push(`/show-rent-report/${landlordId}`)
  }



  const searchInOnChangeFun = async (e) => {
    console.log(e.keyCode ,"koaml koaml  koaml  koaml");
    const Response = await USERAPI.getAllUser(pageNumber,pageLimit, "2", e.target.value);
    // setLoding(true)  
    if (Response.data.status == 200) {
      // console.log(Response.data.data, "jjjjjjjjjjjjjjjjjjjjjjjxschschsshdjshdjshdjshjdsjhd");
      setData(Response.data.data);
      setTotalData(Response.data.count)
      setSearchValue(e.target.value)
      setTimeout(() => {

        setLoding(false)
      }, 1000)

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
 


  const searchfun = async (e) => {
    console.log(e ,"koaml koaml  koaml  koaml");
    const Response = await USERAPI.getAllUser(pageNumber,pageLimit, "2", searchValue);
    // setLoding(true)
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
    }
    else {
      CreateNotification("danger", "Something went wrong, please try again later!")
    }

  }



  //pageLimit ka page
const pageLimitFun= async(event)=>{
  setPageLimit(event.target.value)
  console.log(event.target.value,"prabhakar");
  const Response = await USERAPI.getAllUser(pageNumber,event.target.value, "2", searchValue);
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
  }
  else {
    CreateNotification("danger", "Something went wrong, please try again later!")
  }
}
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3 className="text-center">Landlord  List </h3>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="row">
        <div className="fullNameSec col-8">
          <input type="text" class="form-control" placeholder="Search"
          onChange={searchInOnChangeFun}
          ></input>
        </div>
        <div class="search-btn col-3">
          <button type="submit" class="btn btn-get-started text-center" onClick={(e) => searchfun(e)}> SEARCH</button>
        </div>
      </div>
      {loading ? <Loader /> : <React.Fragment>
        <div className="show-record">
        <label>Show Record</label>
        <select
          className=""
          value={pageLimit}
          onChange={pageLimitFun}
        >
          <option value="" disabled selected
          ></option>
          <option className="dropdown-item" value={10}>10</option>
          <option className="dropdown-item"  value={20}>20</option>
          <option className="dropdown-item"  value={30} >30</option>
        </select> 
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
                        <th>Tenant</th>
                        <th>Rent Report</th>
                      </tr>
                    </thead>
                    {data && data.length >0 ?
                    <tbody>
                      {data && data.length > 0 && data.map((value, index) => {
                        return (
                          <tr>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {value.fullName}
                            </td>
                            <td>
                              {value.email}
                            </td>
                            <td>
                              {value.phoneNumber}
                            </td>
                            <td>
                              <ReadMore > {value.address}</ReadMore>
                            </td>
                            <td>
                              {value.city}
                            </td>
                            <td>
                              {value.country}
                            </td>
                            <td>
                              {value.province}
                            </td>
                            <td>
                              {value.postalCode}
                            </td>
                            <td>
                              <button className={value.status === "Active" ? "btn bg-primary" : "btn btn-secondary  "}
                                onClick={() => changeStatusFun(value._id, value.status)}>
                                {value.status}
                              </button>
                            </td>
                            <td>
                              <Link className="btn btn-success" to={`/Edit/${value._id}`} >Edit</Link></td>
                            {/* <td>
                              <button className="btn btn-danger" onClick={() => deleteUserFun(value._id)}>Delete</button>
                            </td> */}
                             <td>
                              
                               <Delete deleteId = {value._id}/>
                            </td>
                            <td>
                              <button className="btn btn-info" onClick={() => getTenantFun(value._id)}>Tenant</button>
                            </td>
                            <td>
                              <button className="btn btn-info" onClick={() => getTenantRentReport(value._id)}>Rent Report</button>
                            </td>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                    :<h3 className="text notFound text-danger"> DATA NOT FOUND</h3>}  
                  </table>
                </div>
                <div className="table_record_result">
                  <p><span>Total record is : </span> {totalData ? totalData : 0} </p>
                  <Pagination1 paginationFun={paginationFun} allDataCount={totalData} pageLimit={pageLimit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
      }
    </React.Fragment>
  );
};

export default User;





// <span class="icon_act">

//                           //   <Link to={`/edit-client/${value._id}`}><i class="mdi mdi-pencil-box"></i></Link>
//                           // </span>
// <div className="d-flex justify-content-between align-items-end flex-wrap">
// <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/add-client">Add Client</Link>
// </div>


// <td>
// {value.documentType}
// </td>
// <td>
// <img src={`http://localhost:5000/${value.document}`} alt="Profile Pic" />
// </td>
