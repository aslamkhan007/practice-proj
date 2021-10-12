import React from "react";
import "../App.css";
import { CreateNotification } from "../Utils/notification";
import * as USERAPI from "../api/userApi";
import { useState } from "react";

export const Delete = (props) => {

   const [data, setData] = useState();
    const id = props.deleteId


    const deleteUserFun = async () => {
        // debugger;
     

       // window.confirm("Are you sure ?")
        CreateNotification("danger", "Are you sure?");
    
        const Response = await USERAPI.deleteUserApi(id);
        // setLoding(true)
        if (Response.data.status == 200) {
          // window.location.reload()
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
    
  return (
    <>
      <div className="text-center">
        <button
          href="#myModal"
          className="trigger-btn btn btn-danger"
          data-toggle="modal"

        >
          Delete
        </button>
      </div>

      <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <div className="icon-box">
                <i className="material-icons">&#xE5CD;</i>
              </div>
              <h4 className="modal-title w-100">Are you sure?</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={()=>deleteUserFun(id)} >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
