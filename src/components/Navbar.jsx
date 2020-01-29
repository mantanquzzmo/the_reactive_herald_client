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

  const toggleCategory = async event => {
    if (event.target.id == "return") {
      await changeCategory();
    } else {
      await changeCategory(event);
    }
  };

  const changeCategory = async event => {
    let articlesData;
    if (event) {
      articlesData = await getArticles(event);
    } else {
      articlesData = await getArticles();
    }
    if (articlesData.articles.length > 0) {
      props.changeSideArticlesData(articlesData);
      props.changeCurrentPage(articlesData.meta.current_page);
      const article = await getCurrentArticle(articlesData.articles[0].id);
      if (article.error) {
        props.changeMessage(article.error);
      } else {
        props.changeCurrentArticle(article);
      }
    } else {
      props.changeCurrentArticle("");
      props.changeMessage("No articles in that category yet");
      props.changeSideArticlesData("");
      props.changeCurrentPage("")

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
      <Menu secondary pointing fluid widths={7}>
        <Menu.Item name={t("nav.all")} id="return" onClick={toggleCategory} />
        <Menu.Item name={t("nav.news")} id="1" onClick={toggleCategory} />
        <Menu.Item name={t("nav.food")} id="2" onClick={toggleCategory} />
        <Menu.Item name={t("nav.tech")} id="3" onClick={toggleCategory} />
        <Menu.Item name={t("nav.culture")} id="4" onClick={toggleCategory} />
        <Menu.Item name={t("nav.sports")} id="5" onClick={toggleCategory} />
        <Menu.Item name={t("nav.misc")} id="6" onClick={toggleCategory} />
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
    },
      changeMessage: message => {
      dispatch({ type: "CHANGE_MESSAGE", payload: message });
    },
    changeSideArticlesData: articlesData => {
      dispatch({ type: "CHANGE_ARTICLES_DATA", payload: articlesData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
