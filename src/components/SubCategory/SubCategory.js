import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import * as USERAPI from "../../api/userApi";
import * as CategoryApi from "../../api/CategoryApi";
import { CreateNotification } from "../../Utils/notification";
import Modal from 'react-bootstrap/Modal'
import Pagination from "react-js-pagination";

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [category, setcategory] = useState([]);
  const [add_data, setAddData] = useState({});
  const [getDataStatus, setGet] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('Add Subcategory');
  const [button, setButton] = useState('Save');
  const [activePage, setactivePage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setError({});

    setTitle('Add Subcategory');
    setAddData({'name': ''});
    setButton('Save')
    setShow(true)
  };

  const isFormValid = () => {
    if (!add_data.category) {
      setError({ category: "Please select category!"});
        return false;
    }
    else if (!add_data.name) {
      setError({ name: "Subcategory Name is required!"});
        return false;
    }
    else {
      setError({});
        return true;
    }

}
const handleUpdate = async() =>
  {
    const isValid = await isFormValid();

    if(isValid)
    {
      
      const Response = await CategoryApi.UpdateSubCategoryAPI(add_data,add_data.id);
    
      if(Response.data.status == 200)
      {
      CreateNotification("success",Response.data.message)
      getCategory(activePage);

      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger",Response.data.message)
      }
    }
    
  }

  const handleSubmit = async() =>
  {
    const isValid = await isFormValid();

    if(isValid)
    {
      const Response = await CategoryApi.CreateSubCategoryAPI(add_data);
    
      if(Response.data.status == 200)
      {
      getCategory();
      CreateNotification("success",Response.data.message)
      setAddData({'name': '',"id":"","category":""});

      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger",Response.data.message)
      }
    }
    
      // props.history.push('/')
  }

  const onchange = async(event) =>
  {
    setError({});
   
    const { name, value } = event.target;
    setAddData(prevState => ({ ...prevState, [name]: value }));
   
  }
  const getCategory = async(pagenumber=1) =>
  {
      const Response = await CategoryApi.getSubCategoryAPI(pagenumber);
    
      if(Response.data.status == 200)
      {
        setactivePage(pagenumber);

        setData(Response.data.data);
        setcategory(Response.data.category)
        setTotal(Response.data.total)
        setGet(true);

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
  const GetEditdata   = async(id,category, name) =>
  {
    setError({});

    setButton('Update')
    setTitle('Edit Subcategory')
    setAddData({'name': name,"id":id,"category":category});
    setShow(true)
  }
  useEffect(async()=>{
    getCategory();
  },[]);
    return (
      <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3>Subcategory</h3>
              </div>
           
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              <button className="btn btn-primary mt-2 mt-xl-0" variant="primary" onClick={handleShow}>Add Subcategory</button>
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
                    Category Name
                  </th>
                  <th>
                  Subcategory Name
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
                  {value.category.name}
                  </td>
                  <td>
                  {value.name}
                  </td>
                 
                  <td>
                  {value.created_at}
                  </td>
                  <td>
                    <span class="icon_act">
                  <Link onClick={() =>{GetEditdata(value._id,value.category._id,value.name)}}><i class="mdi mdi-pencil-box"></i></Link>
                  </span>
                  </td>
                </tr>
                 ))
                }
               {data && data.length==0 && getDataStatus && 
              <tr><td class="centre" colSpan={5}>No Data Found!</td></tr>
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
              onChange={(e)=>{getCategory(e)}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
            <div className="row">
            
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Category</label>
                  <div className="col-sm-12">
                  <select name="category" value={add_data.category} onChange={(button == "Update")?'':(e) => {onchange(e)}} className="form-control" disabled={(button == "Update")?true:false}>
                      <option value="">Select Category</option>
                      {category && category.length>0 && category.map((value, index) => (
                      <option value={value._id}>{value.name}</option>
                      ))}
                      </select>
                    <span class="form-error">{error.category}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Subcategory Name</label>
                  <div className="col-sm-12">
                    <input type="text" name="name" value={add_data.name} placeholder="Subcategory Name" onChange={(e) => {onchange(e)}} className="form-control" />
                    <span class="form-error">{error.name}</span>
                  </div>
                </div>
              </div>
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-primary mt-2 mt-xl-0" variant="secondary" onClick={handleClose}>
            Close
          </button> */}
          <button className="btn btn-primary mt-2 mt-xl-0" variant="primary" onClick={(button == "Update")?() => {handleUpdate()}:() => {handleSubmit()}}>
            {button}
          </button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default Dashboard;