import React from "react";
import { Menu } from "semantic-ui-react";
import { useTranslation } from 'react-i18next';

const Navbar = () => {

  const { t, i18n } = useTranslation('common')
  
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.id)
  }

  
  return (
    <>
      <Menu secondary pointing>
        <Menu.Item name='Global' />
        <Menu.Item name='Local' />
        <Menu.Item name='English' id="en" onClick={changeLanguage}/>
        <Menu.Item name='Swedish' id="sv" onClick={changeLanguage}/>
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
