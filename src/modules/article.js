import axios from "axios";

const getCurrentArticle = async id => {
  try {
    const response = await axios.get(`/articles/${id}`);
    return response.data.article;
  } catch (error) {
    if (error === 'Network Error') {
      return { error: error.message }
    } else {
      return error.response.data;
    }
  }
};

const getArticles = async () => {
  const response = await axios.get("/articles");
  return response.data;
};

const createArticle = async (title, body) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    const response = await axios.post(
      "/admin/articles",
      {
        article: 
        {
          title: title,
          body: body
        }
      },
      {
        headers: headers
      }
      );
    return response;
  } catch (error) {
    return error.response
  }
};

const getUnpublishedArticles = async () => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get(`/admin/articles`, {
      headers: headers
    });
    debugger
    return response
  } catch (error) {
    debugger
    return error.message;
  }
};

export { getCurrentArticle, getArticles, createArticle, getUnpublishedArticles };
