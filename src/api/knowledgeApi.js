import axios from "axios";
import * as CONFIG from "../config.json";

export const getAddLicenceAPI = async() => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/client/client-add-data`,
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

export const getSingleClientAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/client/single-client/${(id)?id:userData.id}`,
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


export const getCategoryDataAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-category/${id}`,
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


export const getSubCategoryDataAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-subcategory/${id}`,
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

export const getAddKnowledgeDataAPI = async(id) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-add-knowledge`,
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



export const getKnowledgeAPI = async(pagenumber) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-knowledge?page=${pagenumber}`
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


export const getSingleKnowledgeAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/admin/get-single-knowledge/${id}`,
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

export const UpdateClientAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/client/update-client/${id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
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




export const UpdateKnowledgeAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/admin/update-knowledge/${id}`,
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

export const CreateKnowledgeAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {

  try{
    axios.defaults.headers.common['Authorization'] = userData.jwt;

    const response = await axios.post(
      `${CONFIG.API_URL}/admin/add-knowledge`,
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




