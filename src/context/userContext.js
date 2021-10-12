import React from "react";
const userContext = React.createContext({user: 
  {fullName:"",
  address:"",
  email:"",
  phoneNumber:""
},UpdateUserContext:""
}); 

export {
  userContext,
};