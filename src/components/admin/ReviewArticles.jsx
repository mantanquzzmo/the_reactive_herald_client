import React, { useEffect, useState } from "react";
import {
  getUnpublishedArticles,
  publishArticle,
  undoPublishArticle
} from "../../modules/article";
import { Header, Grid } from "semantic-ui-react";

const ReviewArticles = () => {
  let [articles, setArticles] = useState([]);
  let [publishMessage, setPublishMessage] = useState("");
  let [lastPublishedArticle, setLastPublishedArticle] = useState("");
  let articlesList;

  const loadArticles = async () => {
    let response = await getUnpublishedArticles();
    setArticles(response);
  };

  const onPublishHandler = async id => {
    let response = await publishArticle(id);
    let message = `You published article ${response.id}: ${response.title}`;
    setPublishMessage(message);
    setLastPublishedArticle(response.id);
  };

  const onUndoPublishHandler = async id => {
    let response = await undoPublishArticle(id);
    let message = `Undid publishing of article ${response.id}: ${response.title}`;
    setPublishMessage(message);
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
              Article {article.id}: {article.title}
            </h5>
            <p>{article.body}</p>
            <button onClick={() => onPublishHandler(article.id)}>
              Publish
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
          Review articles: {publishMessage}
          {lastPublishedArticle && (
            <button onClick={() => onUndoPublishHandler(lastPublishedArticle)}>
              Undo
            </button>
          )}
        </div>
      </Header>
      <div id="#unpublished-articles">
        <Grid container columns={2}>
          {articlesList && articlesList}
        </Grid>
      </div>
    </>
  );
};

export default ReviewArticles;
