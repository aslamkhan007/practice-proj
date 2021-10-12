import axios from "axios";
import * as CONFIG from "../config.json";
export const UpdateProfileAPI = async (data, id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/api/update/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.status, "response  response   response");
      if (response.status === 200) {

        return {
          data: response.data,
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


export const getUserById = async (id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get/user/${id}`,
      );
      console.log(response.status, "response  response   response");
      if (response.status === 200) {

        return {
          data: response.data,
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


export const getAllUser = async (pagenumber,pagelimt, userRole, search) => {
  console.log(pagenumber, userRole, "pagenumber   pagenumber");
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;
      if (search) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/all-users/${pagenumber}/${pagelimt}/${userRole}?search=${search}`,
        );
        console.log(response.status, "response  response   response");
        if (response.status === 200) {

          return {
            data: response.data,
          };
        } else {
          throw new Error("Something went wrong, please try again later!");
        }
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/all-users/${pagenumber}/${pagelimt}/${userRole}`,
        );
        console.log(response.status, "response  response   response");
        if (response.status === 200) {

          return {
            data: response.data,
          };
        } else {
          throw new Error("Something went wrong, please try again later!");
        }
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



export const changePwAPI = async (data, id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/change-password`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response, "kkkkkkkkkkkkkkkkk");
      if (response.status === 200) {

        return {
          data: response.data,
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



export const deleteUserApi = async (id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/delete-user/${id}`,

      );
      console.log(response, "kkkkkkkkkkkddddddddddddddddddddddddddkkkkkk");
      if (response.status === 200) {

        return {
          data: response.data,
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


export const statusChangeApi = async (id, status) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/change-status/${id}/${status}`,

      );
      // console.log(response,"kkkkkkkkkkkddddddddddddddddddddddddddkkkkkk");
      if (response.status === 200) {

        return {
          data: response.data,
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
export const UpdateUserApi = async (data, id,) => {
  console.log(data, "hhhhhhhhhhhhhhhhhhhhhhh");
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/update-user/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.status, "prabhakahg");
      if (response.status === 200) {

        return {
          data: response.data,
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



export const getUserByIdAPI = async (id,) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-user-by-id/${id}`,

      );
      // console.log(response.status,"kkkkkkkkkkkddddddddddddddddddddddddddkkkkkk");
      if (response.status === 200) {

        return {
          data: response.data,
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

export const getAllTenant = async (id,) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/total-tenant`,

      );
      console.log(response, "kkkkkkkkkkkddddddddddddddddddddddddddkkkkkk");
      if (response.status === 200) {

        return {
          data: response.data,
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


export const getAllLandlord = async (id,) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/total-landlord`,

      );
      console.log(response, "ppppppppppppppppppppppppppppppp");
      if (response.status === 200) {

        return {
          data: response.data,
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





















export const getAddLicenceAPI = async () => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(`${CONFIG.API_URL}/client/client-add-data`,);
      // console.log("LoginAPI response", response);
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
}

export const getSingleClientAPI = async (id) => {

  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/client/single-client/${(id) ? id : userData.id}`,
      );
      // console.log("LoginAPI response", response);
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
}

export const getSingleLicenceAPI = async (id) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/client/single-licence/${id}`,
      );
      // console.log("LoginAPI response", response);
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
}

export const getLicenceAPI = async (data) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/client/licence`,
        data,
      );
      // console.log("LoginAPI response", response);
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
}


export const getClientAPI = async (data) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${CONFIG.API_URL}/client/get-client`,
        data,
      );
      // console.log("LoginAPI response", response);
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
}

export const UpdateClientAPI = async (data, id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/client/update-client/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {

        return {
          data: response.data,
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






export const UpdateLicenceAPI = async (data, id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/client/update-licence/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("LoginAPI response", response);
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
}

export const CreateLicenceAPI = async (data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {

    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/client/add-licence`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("LoginAPI response", response);
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
}

export const CreateClientAPI = async (data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {

    try {
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${CONFIG.API_URL}/client/add-user`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("LoginAPI response", response);
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
}


