import axios from "axios";

const getCurrentArticle = async id => {
  try {
    const response = await axios.get(`v1/articles/${id}`);
    return response.data.article;
  } catch (error) {
    return error.response.data;
  }
};

const getArticles = async () => {
  const response = await axios.get("v1/articles");
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

export { getCurrentArticle, getArticles, createArticle };
