import React, { useState } from "react";
import { createArticle } from "../../modules/article";
import { Header, Input, Button, TextArea, Form } from "semantic-ui-react";

const CreateArticle = () => {
  const [submitArticleMessage, setSubmitArticleMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(false);
  let image64

  const submitArticleHandler = async e => {
    e.preventDefault();
    const response = await createArticle(
      e.target.title.value,
      e.target.body.value,
      image64
    );
    
    if (response.status === 200) {
      setSubmitArticleMessage(
        "Your article was successfully submitted for review."
      );
    } else if (response.status === 422) {
      setSubmitArticleMessage("Your article must have a title and content.");
    }
  };

  const imageUploadHandler = async e => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      image64 = reader.result
      setImagePreview(image64)
    };
    reader.readAsDataURL(image)
  }

  return (
    <>
      <Header>Create a new article</Header>
      <Form id="article-form" onSubmit={submitArticleHandler}>
        <Form.Field control={Input} label="Title" id="title" />
        <div id="image-preview">
          {imagePreview ? <img src={imagePreview} style={{maxWidth: "256px"}}></img> : null }
        </div>
        <Form.Field className="ui button" as="label" htmlFor="image-upload">
          Add image
        </Form.Field>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          onChange={e => imageUploadHandler(e)}
        />
        <Form.Field control={TextArea} label="Body" id="body" />
        <Form.Field control={Button} type="submit" id="submit">
          Submit
        </Form.Field>
      </Form>
      <p id="create-article-message">{submitArticleMessage}</p>
    </>
  );
};

export default CreateArticle;
