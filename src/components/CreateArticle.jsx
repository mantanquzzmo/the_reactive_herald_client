import React, { useState } from "react";
import { createArticle } from "../modules/article";

const CreateArticle = () => {
  const [submitArticleMessage, setSubmitArticleMessage] = useState("");

  const submitArticleHandler = async e => {
    e.preventDefault();
    const response = await createArticle(
      e.target.title.value,
      e.target.body.value
    );

    if (response.status === 200) {
      setSubmitArticleMessage ('Your article was successfully submitted for review.')
    } else if (response.status === 422) {
      setSubmitArticleMessage('Your article must have a title and content.')
    } else {
      debugger
      setSubmitArticleMessage('Something went horribly wrong...')
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
      {submitArticleMessage}
    </div>
  );
};

export default CreateArticle;
