import axios from "axios";

const getUserData = async id => {
  let response = await axios
    .get(`/admin/users/${id}`)
    .then(() => {
      debugger;
      return response.data.user;
    })
    .catch(error => {
      debugger;
      return error.message;
    });
};

export { getUserData };
