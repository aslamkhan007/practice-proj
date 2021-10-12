
import axios from "axios";
require('dotenv').config()


console.log(process.env,"hhhhhhhhhhhhhhhhhhhhh");
console.log(process.env.REACT_APP_API_URL,"ffffffff");






export const LoginAPI = async (data) => {
    console.log("LoginAPI", data);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("LoginAPI response", response);
      if (response.status === 200) {
  
        return {
          data: response,
        };
      } else {
        throw new Error(response.message);
      }
  
    } catch (error) {
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
  
  
  export const ForgotAPI = async (data) => {
    // console.log("LoginAPI", data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/forgotpassword`,
         data,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
  
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }
  
    } catch (error) {
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
  
  
  export const ResetAPI = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/api/update-password`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
  
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }
  
    } catch (error) {
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
  
  