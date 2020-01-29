import React, { useEffect, useState } from "react";
import {
  getUnpublishedArticles,
  publishArticle,
  undoPublishArticle
} from "../../modules/article";
import { Header, Grid } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const ReviewArticles = () => {
  let [articles, setArticles] = useState([]);
  let [publishMessage, setPublishMessage] = useState("");
  let [lastPublishedArticle, setLastPublishedArticle] = useState("");
  let articlesList;
  const { t } = useTranslation();

  const loadArticles = async () => {
    let response = await getUnpublishedArticles();
    setArticles(response);
  };

  const onPublishHandler = async id => {
    let response = await publishArticle(id);
    if (response === "OK") {
      let message = `You published article ${id}`;
      setPublishMessage(message);
      setLastPublishedArticle(id);
    } else {
      setPublishMessage(response);
    }
  };

  const onUndoPublishHandler = async id => {
    let response = await undoPublishArticle(id);
    if (response === "OK") {
      let message = `Undid the publishing of article ${id}`;
      setPublishMessage(message);
      setLastPublishedArticle("");
    } else {
      setPublishMessage(response);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    loadArticles();
  }, [publishMessage]);

  if (articles.length > 0) {
    articlesList = articles.map(article => {
      return (
        <Grid.Column key={article.id}>
          <div id={`review-article-${article.id}`}>
            <h5>
              {t("admin.article")} {article.id}: {article.title}
            </h5>
            <p>{article.body}</p>
            <button onClick={() => onPublishHandler(article.id)}>
              {t("admin.publish")}
            </button>
          </div>
        </Grid.Column>
      );
    });
  }

  return (
    <>
      <Header>
        <div id="publish-header">
          {t("admin.reviewArticles")}: {publishMessage}
          {lastPublishedArticle && (
            <button onClick={() => onUndoPublishHandler(lastPublishedArticle)}>
              {t("admin.undo")}
            </button>
          )}
        </div>
      </Header>
      <div id="unpublished-articles">
        <Grid container columns={2}>
          {articlesList && articlesList}
        </Grid>
      </div>
    </>
  );
};

export default ReviewArticles;
