import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentArticle } from "../modules/article";

const DisplayCurrentArticle = props => {
  const getArticleShowData = async id => {
    const article = await getCurrentArticle(id);
    if (article.error) {
      props.changeMessage(article.error);
    } else {
      props.changeCurrentArticle(article);
    }
  };

  useEffect(() => {
    getArticleShowData(props.currentArticleId);
  }, [props.currentArticleId]);

  return (
    <>
      {props.currentArticle ? (
        <div id="main-article-div" key={props.currentArticle.id}>
          <h2 id="article-title">{props.currentArticle.title}</h2>
          {props.currentArticle.image &&
          <img src={props.currentArticle.image} />
          }
          <p id="article-body">{props.currentArticle.body}</p>
        </div>
      ) : (
        <p id="message">{props.message}</p>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentArticle: state.currentArticle,
    currentArticleId: state.currentArticleId,
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: message => {
      dispatch({ type: "CHANGE_MESSAGE", payload: message });
    },
    changeCurrentArticle: article => {
      dispatch({ type: "CHANGE_ARTICLE", payload: article });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCurrentArticle);
