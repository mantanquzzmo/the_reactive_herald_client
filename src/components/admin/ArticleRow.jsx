import React, { useState } from "react";
import { Table, Checkbox, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ArticleRow = ({ article, publishHandler, deleteHandler }) => {
  let [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    deleteHandler(article.id);
    setShowConfirm(false);
  }

  return (
    <>
      <Table.Cell id={`review-article-${article.id}`}>
        <Link to={`/admin/${article.id}`}>{article.title}</Link>
      </Table.Cell>
      <Table.Cell>{article.category}</Table.Cell>
      <Table.Cell>{article.location}</Table.Cell>
      <Table.Cell>{article.journalist}</Table.Cell>
      <Table.Cell id={`publish-article-toggle-${article.id}`}>
        <Checkbox toggle onClick={() => publishHandler(article.id)} />
      </Table.Cell>
      <Table.Cell>
        <Icon
          name="delete"
          color="red"
          size="large"
          onClick={() => setShowConfirm(true)}
          style={{ cursor: "pointer" }}
        />
      </Table.Cell>
      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => handleConfirm()}
      />
    </>
  );
};

export default ArticleRow;
