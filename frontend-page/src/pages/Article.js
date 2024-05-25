import React from "react";
import "../style/pages-style/article.css";
import axios from "axios";
import MarkNav from "markdown-navbar";
import { Affix } from "antd";
import { useParams } from "react-router-dom";
import { Marked } from "marked";
import 'markdown-navbar/dist/navbar.css';
import hljs from "highlight.js";
import {markedHighlight} from 'marked-highlight'
import 'highlight.js/styles/monokai-sublime.css';
import servicePath from "../config/apiUrl";


export default function Article() {
  const [articleContent, setArticleContent] = React.useState([]);
  const [parsedContent, setParsedContent] = React.useState("");
  const [parsedIntroduce, setParsedIntroduce] = React.useState("");
  const params = useParams();


  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );



  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(servicePath.getArticleById + params.id);
        setArticleContent(response.data.data[0]);


        const html = marked.parse(response.data.data[0].article_content);
        setParsedContent(html);

        const introduce = marked.parse(response.data.data[0].introduce);
        setParsedIntroduce(introduce);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately
      }
    };
    fetchData();
  }, []);

  return (
    <div className="index-box">
      <div className="main-box">
        <div className="articledetail-title">
          <h1>{articleContent.title}</h1>
          <div className="remarks">
            <span>
              Type: <b>{articleContent.typeName}</b>
            </span>
            <span>
              Publish Time: <b>{articleContent.addTime}</b>
            </span>
            <span>
              Num: <b>19</b>
            </span>
            <span>
              Views: <b>{articleContent.view_count}</b>
            </span>
            <span>
              Study Time: <b>3h29m</b>
            </span>
          </div>
        </div>
        <div
          className="introduce-html"
          dangerouslySetInnerHTML={{ __html: parsedIntroduce }}
        ></div>
        <div
          className="article-details"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        ></div>
      </div>
      <div className="left-box">
        <Affix offsetTop={5}>
          <div className="detailed-nav comm-box">
            <div className="nav-title">Table of Contents</div>
            <MarkNav
              className="article-menu"
              source={articleContent.article_content}
              ordered={false}
            />
          </div>
        </Affix>
      </div>
    </div>
  );
}
