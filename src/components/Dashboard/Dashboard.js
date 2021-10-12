import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Footer from '../common/footer';
const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});
const [totalTenantCount, settotalTenantCount] = useState()
const [totalLandlordCount, setTotalLandlordCount] = useState()
const allTenantCount =async()=>{

  const Response = await USERAPI.getAllTenant();
  console.log(Response,"jhhhhhhhsxxxxxxxxxxxxxxxxxxxxxxxxhhh");
    if (Response.data.status == 200) {
      settotalTenantCount(Response.data.totalTenant)
     
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
const allLandlordCount = async()=>{
  const Response = await USERAPI.getAllLandlord();
    if (Response.data.status == 200) {
      setTotalLandlordCount(Response.data.totalLandlord)
     
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
  useEffect(()=>{
    allTenantCount()
    allLandlordCount()
  },[]);

    return (
   
        <React.Fragment>
        
        <div class="dashboard-box-wrapper">
        <div class="dashboard-box">
           <ul>
              <li>
                 <div class="realestate-landlord panel panel-featured-left panel-featured-tertiary ">
                       <div class="panel-body">
                          <div class="dsh-summary">
                             <div class="dsh-summary-col dsh-summary-col-icon">
                                <div class="summary-icon bg-tertiary ">
                               <img src="data:image/png;base64,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"/>
                                </div>
                             </div>
                             <div class="dsh-summary-col">
                                <div class="summary">
                                   <h4 class="title">Total landloard</h4>
                                   <div class="info">
                                      <strong class="total">{totalLandlordCount}</strong>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                 </div>
              </li>
              <li>
                  <div class="realestate-landlord panel panel-featured-left panel-featured-secondary">
                       <div class="panel-body">
                          <div class="dsh-summary">
                             <div class="dsh-summary-col dsh-summary-col-icon">
                                <div class="summary-icon bg-secondary">
                                  <i class="fas fa-house-user"></i>
                                </div>
                             </div>
                             <div class="dsh-summary-col">
                                <div class="summary">
                                   <h4 class="title">Current Tenancies</h4>
                                   <div class="info">
                                      <strong class="total">{totalTenantCount}</strong>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                 </div>
              </li>
           </ul>
        </div>
     </div>
        </React.Fragment>
    
    );
};

export default Dashboard;