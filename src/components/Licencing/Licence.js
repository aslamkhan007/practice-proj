import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import * as USERAPI from "../../api/userApi";
import { CreateNotification } from "../../Utils/notification";

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({});

  const getLicence = async() =>
  {
      const Response = await USERAPI.getLicenceAPI(data);
    
      if(Response.data.status == 200)
      {
        setData(Response.data.data);
      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger","Something went wrong, please try again later!")
      }
     
  }

  useEffect(async()=>{
    getLicence();
  },[]);

    return (
      <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3>Licence List</h3>
              </div>
           
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/add-licence">Add Licence</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
        
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>

                <tr>
                  <th>
                    Sr. No.
                  </th>
                  <th>
                    License name
                  </th>
                  <th>
                    No. of Client
                  </th>
                  <th>
                  No. of Collaborator
                  </th>
                  <th>
                  No. of Verifier
                  </th>
                  <th>
                    Date
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {data && data.length>0 && data.map((value, index) => (
                <tr>
                  <td className="py-1">
                  {index+1}
                  </td>
                  <td>
                  {value.name}
                  </td>
                  <td>
                  {value.no_client}
                
                  </td>
                  <td>
                  {value.no_collaborator}
                  </td>
                  <td>
                  {value.no_verifier}
                  </td>
                  <td>
                  {value.created_at}
                  </td>
                  <td>
                    <span class="icon_act">
                  <Link to={`/edit-licence/${value._id}`}><i class="mdi mdi-pencil-box"></i></Link>
                  </span>
                  </td>
                </tr>
                 ))
                }
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
    );
};

export default Dashboard;