import axios from "axios";


export const getTenantRentReportApi = async (landlordId) => {
    console.log(landlordId,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      try {
        axios.defaults.headers.common['Authorization'] = userData.token;
  
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/get-tenent-rent-report-loadlord-by-id/${landlordId}`
        );
        // console.log(response,"dskdkslslsdlskldslsdk");
        // console.log(response.status, "response  response   response");
        if (response.status === 200) {
  
          return {
            data: response.data,     
          };
        } else {
          throw new Error("Something went wrong, please try again later!");
        }
  
      } catch (error) {
        console.log("error", error);
        // return {
        //   status: 400,
        //   message: error.message,
        //   data: "",
        // };
      }
    }
  }