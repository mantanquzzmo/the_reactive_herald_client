import React, { useEffect, useState } from "react";
import { getUnpublishedArticles, publishArticle } from "../../modules/article";
import { Header, Input, Button, TextArea, Form } from "semantic-ui-react";

const ReviewArticles = () => {
  let [articles, setArticles] = useState([]);
  let articlesList

  const loadArticles = async () => {
    let response = await getUnpublishedArticles();
    debugger
    setArticles(response);
  };

  const onClickHandler = async (id) => {
    let response = await publishArticle(id)
  }

  useEffect(() => {
    loadArticles();
  }, []);

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
      <div id="#unpublished-articles">
      {articlesList && articlesList}
      </div>
    </>
  );
};

export default ReviewArticles;
