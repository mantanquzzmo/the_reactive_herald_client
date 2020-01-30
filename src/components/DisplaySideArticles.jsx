import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../modules/article";
import { useTranslation } from "react-i18next";

const DisplaySideArticles = props => {
  const { t } = useTranslation();

  const getArticleShowData = async () => {
    const articlesData = await getArticles(props.language);
    props.changeSideArticlesData(articlesData);
    props.changeCurrentPage(articlesData.meta.current_page);
  };

  if (
    !props.sideArticles &&
    props.message != "No articles in that category yet"
  ) {
    getArticleShowData();
  }

  useEffect(() => {
    if (props.sideArticles && props.sideArticles.articles.length > 0) {
      props.changeCurrentArticleId(props.sideArticles.articles[0].id);
    }
  }, [props.currentPage]);

  useEffect(() => {
    getArticleShowData();
  }, [props.language]);

  let articlesList;

  if (props.sideArticles && props.sideArticles.articles.length > 0) {
    articlesList = props.sideArticles.articles.map(article => {
      if (article.id !== props.currentArticleId) {
        return (
          <div id={`side-article-${article.id}`} key={article.id}>
            <a
              onClick={() => props.changeCurrentArticleId(article.id)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {article.title}
            </a>
            <p>{article.body}</p>
          </div>
        );
      }
    });
  }

  return (
    <div id="side-articles">
      {!props.sideArticles ? (
        <p id="message">{t("dsa.loading")}</p>
      ) : props.sideArticles.articles.length > 0 ? (
        articlesList
      ) : (
        <p id="error-message">{t("dsa.error")}</p>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    sideArticles: state.sideArticles,
    currentArticleId: state.currentArticleId,
    currentPage: state.currentPage,
    language: state.language,
    message: state.message
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplaySideArticles);
