import axios from "axios";
import { connect } from "react-redux";

const getUserData = async props => {
    const response = await axios.get(`/api/admin/users/${props.userId}`);
    return response.data.user;
};

const mapStateToProps = state => ({
  userId: state.userId,
});

export { getUserData }
connect(mapStateToProps)(getUserData);
