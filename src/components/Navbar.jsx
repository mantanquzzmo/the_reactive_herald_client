import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = props => {
  return (
    <>
      <Menu secondary pointing>
        <Menu.Item name='Global' />
        <Menu.Item name='Local' />
        {props.userAttrs && props.userAttrs.role === 'journalist' && (
          <Menu.Item as={ Link } name='Create article' to='/create-article' id="create-article" />
        )}
      </Menu>
      <Menu secondary pointing fluid widths={5}>
        <Menu.Item name='News' />
        <Menu.Item name='Food' />
        <Menu.Item name='Tech' />
        <Menu.Item name='Culture' />
        <Menu.Item name='Sports' />
      </Menu>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs
  };
};

export default connect(mapStateToProps)(Navbar);
