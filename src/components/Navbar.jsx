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
        <Menu.Item name={t('nav.global')} />
        <Menu.Item name={t('nav.local')} />
        <Menu.Item name={t('nav.english')} id="en" onClick={changeLanguage}/>
        <Menu.Item name={t('nav.swedish')} id="sv" onClick={changeLanguage}/>
      </Menu>
      <Menu secondary pointing fluid widths={5}>
        <Menu.Item name={t('nav.news')} />
        <Menu.Item name={t('nav.food')} />
        <Menu.Item name={t('nav.tech')} />
        <Menu.Item name={t('nav.culture')} />
        <Menu.Item name={t('nav.sports')} />
      </Menu>
    </>
  );
};

export default Navbar;
