import React, { useEffect } from "react";
import { getUnpublishedArticles } from "../../modules/article";

const ReviewArticles = () => {
  const loadArticles = async () => {
    const response = await getUnpublishedArticles();
    debugger;
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return <div>hej</div>;
};

export default ReviewArticles;
