import axios from "axios";

const getUserData = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get(`/admin/users/${id}`, {
      headers: headers
    });
    return response.data.user;
  } catch (error) {
    return error.message;
  }
};

export { getUserData };
