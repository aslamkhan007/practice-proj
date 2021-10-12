import axios from "axios";



export const getHomePageDataAPI = async (data) => {
  console.log(data,"kkkkkkkkkkkkkkkkkkk");
  let userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData,"kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-home`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(response, "response  response   response");
      if (response.status === 200) {
        return {
          data: response.data
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
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
}

export const UpdateHomePageAPI = async (data) => {
  console.log(data,"kkkkkkkkkkkkkkkkkkk");
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/update-home`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.status, "response  response   response");
      if (response.status === 200) {
        return {
          data: response.data
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
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
}

export const updateHowCreditproofworksApi = async (data) => {
  console.log(data,"kkkkkkkkkkkkkkkkkkk");
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/update-home-how-credit-proof-work`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.status, "response  response   response");
      if (response.status === 200) {
        return {
          data: response.data
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
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
}



export const UpdateHappyClientPageAPI = async (data) => {
  console.log(data,"kkkkkkkkkkkkkkkkkkk");
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/happy-client-home`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.status, "response  response   response");
      if (response.status === 200) {
        return {
          data: response.data
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
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
}




export const UpdateContactPageAPI = async (data) => {
  console.log(data,"kkkkkkkkkkkkkkkkkkk");
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/update-contect-us`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.status, "response  response   response");
      if (response.status === 200) {
        return {
          data: response.data
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
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
}











