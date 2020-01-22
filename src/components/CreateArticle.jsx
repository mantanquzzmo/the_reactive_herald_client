import React, { useState } from "react";
import { createArticle } from "../modules/article";
import { Input, Button, TextArea, Form } from "semantic-ui-react"

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
    }
  };

  return (
    <div>
      <Form id='article-form' onSubmit={submitArticleHandler}>
        <Form.Field
          control={Input}
          label='Title'
          id='title'
        />
        <Form.Field
          control={TextArea}
          label='Body'
          id='body'
        />
        <Form.Field
          control={Button}
          type='submit' 
          id="submit">
            Submit
          </Form.Field>
      </Form>
      <p id='create-article-message'>{submitArticleMessage}</p>
      
    </div>
  );
};

export default CreateArticle;
