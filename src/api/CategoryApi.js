import axios from "axios";
import * as CONFIG from "../config.json";


export const UpdateCategoryAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/admin/update-category/${id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}


export const UpdateSubCategoryAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/admin/update-subcategory/${id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const CreateCategoryAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {

  try{
    axios.defaults.headers.common['Authorization'] = userData.jwt;

    const response = await axios.post(
      `${CONFIG.API_URL}/admin/add-category`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    // console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}
}

export const CreateSubCategoryAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {

  try{
    axios.defaults.headers.common['Authorization'] = userData.jwt;

    const response = await axios.post(
      `${CONFIG.API_URL}/admin/add-subcategory`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    // console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}
}




export const getCategoryAPI = async(pagenumber) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-category?page=${pagenumber}`
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}


export const getSubCategoryAPI = async(pagenumber) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-subcategory?page=${pagenumber}`
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}
