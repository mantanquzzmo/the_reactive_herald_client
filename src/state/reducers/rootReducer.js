import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_ARTICLE":
      return {
        ...state,
        currentArticle: action.payload
      };
    case "CHANGE_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    case "CHANGE_ARTICLES_DATA":
      return {
        ...state,
        sideArticles: action.payload
      };
    case "CHANGE_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload
      };
    case "CHANGE_ARTICLE_ID":
      return {
        ...state,
        currentArticleId: action.payload
      };
    case "CHANGE_AUTHENTICATED":
      return {
        ...state,
        authenticated: action.payload
      };
    case "SET_USERID":
      return {
        ...state,
        userId: action.payload
      };
    default:
      return {
        state
      };
  }
};

export default rootReducer;
