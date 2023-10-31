import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/components-style/article-list.css";
import servicePath from "../config/apiUrl";
import { marked } from "marked";
import { Pagination } from "antd";

export default function ArticleList() {
  const [articleData, setArticleData] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [articleNum, setArticleNum] = React.useState();

  React.useEffect(() => {
    getArticleCount();
    getArticle();
  }, [pageNum, pageSize, articleNum]);

  async function getArticle() {
    try {
      const response = await axios({
        url: servicePath.getArticleListByPageNum,
        params: {
          pageNum: pageNum,
          pageSize: pageSize,
        },
      });
      setArticleData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  async function getArticleCount() {
    try {
      const response = await axios({
        url: servicePath.getArticleCount,
        withCredentials: true,
        header: { "Access-Control-Allow-Origin": "*" },
      });
      const countObject = response.data.data[0];
      setArticleNum(countObject["COUNT(id)"]);
    } catch (error) {
      console.error('error:', error.message)
    }
  }

  function changePage(page, pageSize) {
    setPageNum(page);
    setPageSize(pageSize);
  }

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const articles = articleData.map((article) => {
    return (
      <div key={article.id} className="article">
        <Link to={`${article.id}`} target="_blank" className="article-title">
          {article.title}
        </Link>
        <div className="article-info">
          <span className="publish-time">{article.addTime}</span>
          <span className="category">{article.typeName}</span>
          <span className="visits">Read: {article.view_count}</span>
        </div>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: marked(article.introduce) }}
        ></div>
        <Link to={`${article.id}`} target="_blank" className="read-more">
          More
        </Link>
      </div>
    );
  });

  return (
    <div className="list-container">
      {articles}
      <Pagination
        showQuickJumper
        current={pageNum}
        total={articleNum}
        pageSize={pageSize}
        onChange={(page, pageSize) => changePage(page, pageSize)}
      />
    </div>
  );
}
