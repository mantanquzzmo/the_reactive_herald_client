import React from "react";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <>
      <Menu secondary pointing>
        <Menu.Item name='Global' />
        <Menu.Item name='Local' />
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

export default Navbar;
