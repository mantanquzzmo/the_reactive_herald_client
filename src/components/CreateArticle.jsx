import React from "react";
import { createArticle } from "../modules/article";

const CreateArticle = () => {
  let responseMessage;

  const submitArticleHandler = async e => {
    e.preventDefault();
    const response = await createArticle(
      e.target.title.value,
      e.target.body.value
    );

    if (response.status === 200) {
      responseMessage = (
        <p>Your article was successfully submitted for review.</p>
      );
    } else if (response.status === 422) {
      responseMessage = <p>Your article must have a title and content.</p>;
    } else {
      responseMessage = <p>Something went wrong...</p>;
    }
  };

  return (
    <div>
      <form id="article-form" onSubmit={submitArticleHandler}>
        <label>Title:</label>
        <input name="title" type="text" id="title"></input>

        <label>Body:</label>
        <input name="body" type="text-area" id="body"></input>

        <button id="submit">Submit</button>
      </form>
      {responseMessage}
    </div>
  );
};

export default CreateArticle;
