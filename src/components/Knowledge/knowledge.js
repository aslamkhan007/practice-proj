import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import * as knowledgeApi from "../../api/knowledgeApi";
import { CreateNotification } from "../../Utils/notification";
import Pagination from "react-js-pagination";

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [activePage, setactivePage] = useState(1);
  const [total, setTotal] = useState(0);

  const getKnowledge = async(pagenumber=1) =>
  {
      const Response = await knowledgeApi.getKnowledgeAPI(pagenumber);
    
      if(Response.data.status == 200)
      {
        setactivePage(pagenumber);
        
        setData(Response.data.data);
        setTotal(Response.data.total)
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
    getKnowledge();
  },[]);

    return (
      <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3>Knowledge Base</h3>
              </div>
           
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/add-knowledge">Add Knowledge</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Knowledge Base</h4>
          <p className="card-description">
            {/* Add class <code>.table-striped</code> */}
          </p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    Sr. No.
                  </th>
                  <th>
                    Scope
                  </th>
                  <th>
                    Category
                  </th>
                  <th>
                  SubCategory
                  </th>
                  <th>
                    Name
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
                  {value.scope_id.name}
                  </td>
                  <td>
                  {value.category.name}
                  </td>
                  <td>
                  {value.sub_category && value.sub_category.name}
                  </td>
                  <td>
                  {value.name}
                  </td>
                  <td>
                    <span class="icon_act">
                  <Link to={`/edit-knowledge/${value._id}`}><i class="mdi mdi-pencil-box"></i></Link>
                  </span>
                  </td>
                </tr>
                 ))
                }
              </tbody>
             
            </table>
            <div id="pagination">
              <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={(e)=>{getKnowledge(e)}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
    );
};

export default Dashboard;