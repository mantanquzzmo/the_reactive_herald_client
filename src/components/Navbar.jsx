import React from "react";
import { Menu } from "semantic-ui-react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { getArticles } from "../modules/article";

const Navbar = props => {

  const { t, i18n } = useTranslation('common')
  
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.id)
  }

  const getArticleShowData = async (id) => {
    const articlesData = await getArticles(id);
    props.changeSideArticlesData(articlesData);
    props.changeCurrentPage(articlesData.meta.current_page);
  };
  
  return (
    <>
      <Menu secondary pointing>
        <Menu.Item name={t('nav.global')} />
        <Menu.Item name={t('nav.local')} />
        <Menu.Item name={t('nav.english')} id="en" onClick={changeLanguage}/>
        <Menu.Item name={t('nav.swedish')} id="sv" onClick={changeLanguage}/>
      </Menu>
      <Menu secondary pointing fluid widths={5}>
        <Menu.Item name={t('nav.news')} id="0" onClick={getArticleShowData}/>
        <Menu.Item name={t('nav.food')} id="1" onClick={getArticleShowData}/>
        <Menu.Item name={t('nav.tech')} id="2" onClick={getArticleShowData}/>
        <Menu.Item name={t('nav.culture')} id="3" onClick={getArticleShowData}/>
        <Menu.Item name={t('nav.sports')} id="4" onClick={getArticleShowData}/>
        <Menu.Item name={t('nav.misc')} id="5" onClick={getArticleShowData}/>
      </Menu>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeSideArticlesData: articlesData => {
      dispatch({ type: "CHANGE_ARTICLES_DATA", payload: articlesData });
    },
    changeCurrentPage: currentPage => {
      dispatch({ type: "CHANGE_CURRENT_PAGE", payload: currentPage });
    },
    changeCurrentArticleId: id => {
      dispatch({ type: "CHANGE_ARTICLE_ID", payload: id });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Navbar);

