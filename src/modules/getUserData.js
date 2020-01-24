import axios from "axios";

const getUserData = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios
    .get(`/admin/users/${id}`,
    {
      headers: headers
    })
    .then(response => {
      return response.data.user;
    })
    .catch(error => {
      return error.message;
    });
    return response
};

export { getUserData };