import axios from "axios";

const getCurrentArticle = async id => {
  try {
    const response = await axios.get(`/articles/${id}`);
    return response.data.article;
  } catch (error) {
    if (error === "Network Error") {
      return { error: error.message };
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
  try {
    const response = await axios.post(
      "/admin/articles",
      {
        article: {
          title: title,
          body: body
        }
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const getUnpublishedArticles = async () => {
  try {
    let response = await axios.get(`/admin/articles`);
    return response.data.articles;
  } catch (error) {
    return error.message;
  }
};

const publishArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  debugger;
  try {

    let response = await axios({
      url: `/admin/articles/${id}`,
      method: "patch",
      headers: headers,
      params: {
        article: {
          published: true
        }

      },
    });

    return response;
  } catch (error) {

    return error;
  }
};

export {
  getCurrentArticle,
  getArticles,
  createArticle,
  getUnpublishedArticles,
  publishArticle
};
