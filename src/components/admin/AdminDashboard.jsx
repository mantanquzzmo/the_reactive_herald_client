import React from 'react'
import { connect } from 'react-redux'
import CreateArticle from './CreateArticle'
import ReviewArticles from './ReviewArticles'

const AdminDashboard = props => {
  let renderDashboard

  switch (true) {
    case !props.authenticated:
      renderDashboard = (
        <p>You need to log in to access employee features.</p>
      );
      break;
    case props.userAttrs && props.userAttrs.role === 'journalist':
      renderDashboard = (
        <CreateArticle />
      )
      break;
    case props.userAttrs && props.userAttrs.role === 'publisher':
      renderDashboard = (
        <ReviewArticles />
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
