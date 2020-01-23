import axios from "axios";
import { connect } from "react-redux";

const getUserData = async props => {
    const response = await axios.get(`/api/admin/users/${props.userAttrs.id}`);
    return response.data.user;
};

const mapStateToProps = state => ({
  userAttrs: state.userAttrs,
});

export { getUserData }
connect(mapStateToProps)(getUserData);
