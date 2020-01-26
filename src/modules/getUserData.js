import axios from "axios";

const getUserData = async id => {
  try {
    let response = await axios.get(`/admin/users/${id}`);
    return response.data.user;
  } catch (error) {
    return error.message;
  }
};

export { getUserData };
