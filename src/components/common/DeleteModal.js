
// import React from "react"

// const ConformDeleteuserComponent = (props) => {
//     // console.log(props.fullName,"props.fullName}    props.fullName}");
//     // const deleteUserFun = async () => {
//     //     const Response = await USERAPI.deleteUserApi(id);
//     //     console.log(Response, "bbbbbbbbbbbbbbbbbbbbbb");
    
//     //     if (Response.data.status == 200) {
//     //       window.location.reload()
//     //       const Response = await USERAPI.getAllUser(data);
//     //       console.log(Response.data.status, "bbbbbbbbbbbbbbbbbbbbbb");
    
//     //       if (Response.data.status == 200) {
//     //         setData(Response.data.data);
//     //       }
//     //       else if (Response.data.status == 401) {
//     //         CreateNotification("danger", "Session has been expired!");
//     //         localStorage.clear();
//     //         props.history.push('/login')
//     //       }
//     //     }
//     //     else if (Response.data.status == 401) {
//     //       CreateNotification("danger", "Session has been expired!");
//     //       localStorage.clear();
//     //       props.history.push('/login')
//     //     }    
//     //     else {
//     //       CreateNotification("danger", "Something went wrong, please try again later!")
//     //     }
//     //   }

//     return (
//       <React.Fragment>
//         <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
//           <i className="mdi mdi-delete btn-danger w-60" >  </i>
//         </button>
//         <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Do you want to delete <b>{props.fullName}</b> </p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
//                 <button type="button" onClick={() => deleteUserFun()} data-dismiss="modal" className="btn btn-primary">Yes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </React.Fragment>
//     )
//   }

//   export default ConformDeleteuserComponent
