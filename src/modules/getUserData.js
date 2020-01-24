import axios from "axios";

const getUserData = async id => {
  debugger
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios
    .get(`/admin/users/${id}`,
    {
      headers: headers
    })
    .then(response => {
      debugger
      return response.data.user;
    })
    .catch(error => {
      debugger
      return error.message;
    });
    return response
};

export { getUserData };
