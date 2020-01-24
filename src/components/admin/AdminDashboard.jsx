import React from 'react'
import { connect } from 'react-redux'
import CreateArticle from './CreateArticle'

const AdminDashboard = props => {
  let renderDashboard

  switch (true) {
    case !props.authenticated:
      renderDashboard = (
        <p>You need to log in to access employee features.</p>
      );
      break;
    case props.authenticated && props.userAttrs && props.userAttrs.role === 'journalist':
      renderDashboard = (
        <CreateArticle />
      )
      break;
    default: renderDashboard = null
  }

  return (
    <>
      {renderDashboard}
    </>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    userAttrs: state.userAttrs
  };
};

export default connect(mapStateToProps)(AdminDashboard)
