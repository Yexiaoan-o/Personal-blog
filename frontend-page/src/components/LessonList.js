import React from "react";
import "../style/components-style/lesson-list.css";
import axios from "axios";
import { Link } from "react-router-dom";
import servicePath from "../config/apiUrl";

export default function LessonList() {

  const [articleData, setArticleData] = React.useState([])


  React.useEffect(() =>{
    getArticle()
  }, []) 

      async function getArticle () {
      try {
        const response = await axios(servicePath.getArticleList)
        setArticleData(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
     
    }



  const lessons = articleData.map((article, index) => {
    return (
      <li key={article.id}>
        <Link to={`${article.id}`} target="_blank">
          <span class="article-num">{index + 1}. </span>
          <span class="article-a">{article.title}</span>
          <span class="article-view">{article.view_count}</span>
          <span class="article-date">{article.addTime}</span>
        </Link>
      </li>
    );
  });
  return (
    <div className="lesson-container">
      <div className="list-title">Article List</div>
      <ul className="bl-list">
        <li class="list-b">
          <span class="article-num"></span>
          <span class="article-a"></span>
          <span class="article-view">Reads</span>
          <span class="article-date">Time</span>
        </li>
        {lessons}
      </ul>
    </div>
  );
}
