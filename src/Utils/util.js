export const getHeader = async () => {
  // let userData = await JSON.parse(localStorage.getItem("userData"));
  let userData = await JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    return {
      headers: {
        // token: "Bearer" + " " + userData.token,
        'authorization': userData.jwt
      },
    };
  }
};

export const addUserIdToData = async (data) => {
  let userData = await JSON.parse(localStorage.getItem("userData"));
  let newData = data;
  newData.user_id = userData.id;
  return newData;
};
