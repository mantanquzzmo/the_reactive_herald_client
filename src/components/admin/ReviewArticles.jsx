import React, { useEffect, useState } from "react";
import { getUnpublishedArticles, publishArticle } from "../../modules/article";
import { Header, Input, Button, TextArea, Form } from "semantic-ui-react";

const ReviewArticles = () => {
  let [articles, setArticles] = useState([]);
  let [publishMessage, setPublishMessage] = useState("")
  let articlesList

  const loadArticles = async () => {
    let response = await getUnpublishedArticles();
    setArticles(response);
  };

  const onClickHandler = async (id) => {
    let response = await publishArticle(id)
    let message = `Published article: ${response.title}`
    setPublishMessage(message)
  }

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    debugger
  }, [publishMessage]);

  if (articles.length > 0) {
    articlesList = articles.map(article => {
      return (
        <div id={`review-article-${article.id}`} key={article.id}>
          <h5>{article.title}</h5>
          <p>{article.body}</p>
          <button onClick={() => onClickHandler(article.id)}>Publish</button>
        </div>
      );  
    });
  }

  return (
    <>
      <Header>Review articles</Header>

      {publishMessage}
      <div id="#unpublished-articles">
      {articlesList && articlesList}
      </div>
    </>
  );
};

export default ReviewArticles;
