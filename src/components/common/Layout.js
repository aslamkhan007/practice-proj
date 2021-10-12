import React, { useState, useEffect } from "react";
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Footer from '../common/footer';
const Dashboard = (props) => {
  


  useEffect(async()=>{
    // props.location_props.history.push('/login')

  },[]);
console.log(props,'props1')
    return (
      <div className="container-scroller">
       <Header location_props={props}/>
        <div className="container-fluid page-body-wrapper">
        <Sidebar location_props={props}/>
        <div className="main-panel">
        <div class="content-wrapper">
          {props.children}
        </div>

        <Footer/>
        </div>
          
        
        </div>
      </div>
    
    );
};

export default Dashboard;