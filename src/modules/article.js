import axios from "axios";

const getCurrentArticle = async (id) => {
  try {
    const response = await axios.get(`v1/articles/${id}`);
    return response.data.article;
  } catch (error) {
    return error.response.data
  }
};

const getArticles = async () => {
  const response = await axios.get("v1/articles");
  return response.data;
};

const createArticle= async (title,body) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };
  try {
    await axios.post("/admin/articles", 
      { 
        title:title,
        body:body
      }, {
        headers: headers
      }
    );
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

export { getCurrentArticle, getArticles, createArticle };
