import React, { useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getArticles, getCurrentArticle } from "../modules/article";

const Navbar = props => {
  const { t, i18n } = useTranslation("common");

  const changeLanguage = event => {
    i18n.changeLanguage(event.target.id);
  };

  const changeCategory = async event => {
    const articlesData = await getArticles(event);
    props.changeSideArticlesData(articlesData);
    props.changeCurrentPage(articlesData.meta.current_page);
    const article = await getCurrentArticle(articlesData.articles[0].id);
    if (article.error) {
      props.changeMessage(article.error);
    } else {
      props.changeCurrentArticle(article);
    }
  };

  return (
    <>
      <Menu secondary pointing>
        <Menu.Item name={t("nav.global")} />
        <Menu.Item name={t("nav.local")} />
        <Menu.Item name={t("nav.english")} id="en" onClick={changeLanguage} />
        <Menu.Item name={t("nav.swedish")} id="sv" onClick={changeLanguage} />
      </Menu>
      <Menu secondary pointing fluid widths={6}>
        <Menu.Item name={t("nav.news")} id="0" onClick={changeCategory} />
        <Menu.Item name={t("nav.food")} id="1" onClick={changeCategory} />
        <Menu.Item name={t("nav.tech")} id="2" onClick={changeCategory} />
        <Menu.Item
          name={t("nav.culture")}
          id="3"
          onClick={changeCategory}
        />
        <Menu.Item name={t("nav.sports")} id="4" onClick={changeCategory} />
        <Menu.Item name={t("nav.misc")} id="5" onClick={changeCategory} />
      </Menu>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentArticleId: state.currentArticleId
  };
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
    },
    changeCurrentArticle: article => {
      dispatch({ type: "CHANGE_ARTICLE", payload: article });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
