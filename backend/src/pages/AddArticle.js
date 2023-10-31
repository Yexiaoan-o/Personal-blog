import { marked } from "marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import "highlight.js/styles/monokai-sublime.css";
import React, { useState, useEffect } from "react";
import "../static/style/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

export default function AddArticle() {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState(""); //html内容
  const [introducemd, setIntroducemd] = useState(""); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState(""); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectTypeId, setSelectTypeId] = useState(); //选择的文章类别
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getTypeInfo();
    let temId = params.id;
    let temData = JSON.parse(localStorage.getItem("temData"));
    if (temId) {
      setArticleId(temId);
      getArticleById(temId);
    } else if (temData && temData.articleId) {
      setArticleId(temData.articleId);
      getArticleById(temData.articleId);
    } else {
      getSavedArticle(temData);
    }
  }, []);

  function changeContent(e) {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  }

  function changeIntroduce(e) {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  }

  async function getTypeInfo() {
    try {
      const response = await axios({
        method: "get",
        url: servicePath.getTypeInfo,
        header: { "Access-Control-Allow-Origin": "*" },
        withCredentials: true,
      });

      if (response.data.data == "No Login") {
        localStorage.removeItem("openId");
        navigate("/");
      } else {
        setTypeInfo(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  function selectTypeHandler(value) {
    setSelectTypeId(value);
  }

  function saveArticle() {
    let temData = {};
    temData.typeId = selectTypeId;
    temData.title = articleTitle;
    temData.article_content = articleContent;
    temData.introduce = introducemd;
    temData.addTime = new Date(showDate + "T00:00:00Z").getTime() / 1000;
    temData.articleId = params.id;
    localStorage.setItem("temData", JSON.stringify(temData));
    message.success("The article is saved.");
  }

  function getSavedArticle(temData) {
    if (temData) {
      setArticleTitle(temData.title);
      setArticleContent(temData.article_content);
      let html = marked(temData.article_content);
      setMarkdownContent(html);
      setIntroducemd(temData.introduce);
      let temInt = marked(temData.introduce);
      setIntroducehtml(temInt);
      setShowDate(temData.addTime);
      setSelectTypeId(temData.typeId);
    }
  }

  function publishArticle() {
    if (!selectTypeId) {
      message.error("You must select an article type.");
      return false;
    } else if (!articleTitle) {
      message.error("You must enter an article title,");
      return false;
    } else if (!articleContent) {
      message.error("You must enter article content.");
      return false;
    } else if (!introducemd) {
      message.error("You must enter an introduction.");
      return false;
    } else if (!showDate) {
      message.error("You must select a date.");
      return false;
    }
    let dataProps = {};
    dataProps.type_id = selectTypeId;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    dataProps.addTime = new Date(showDate + "T00:00:00Z").getTime() / 1000;

    if (articleId === 0) {
      dataProps.view_count = 0;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("The article is published.");
          localStorage.clear("temData");
          setTimeout(() => {
            navigate("/index/list");
          }, 1000);
        } else {
          message.error("Failed to publish the article.");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("The article is updated.");
          localStorage.clear("temData");
          setTimeout(() => {
            navigate("/index/list");
          }, 1000);
        } else {
          message.error("Failed to update the article.");
        }
      });
    }
  }

  function getArticleById(id) {
    axios(servicePath.getArticleById + id, { withCredentials: true }).then(
      (res) => {
        let articleInfo = res.data.data[0];
        setArticleTitle(articleInfo.title);
        setArticleContent(articleInfo.article_content);
        let html = marked(articleInfo.article_content);
        setMarkdownContent(html);
        setIntroducemd(articleInfo.introduce);
        let temInt = marked(articleInfo.introduce);
        setIntroducehtml(temInt);
        setShowDate(articleInfo.addTime);
        setSelectTypeId(articleInfo.typeId);
      }
    );
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="Enter article title"
                size="large"
                value={articleTitle}
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={"Select Type"}
                value={selectTypeId}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
                placeholder="Enter article content"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large" onClick={saveArticle}>
                Save
              </Button>
              &nbsp;
              <Button size="large" type="primary" onClick={publishArticle}>
                Publish
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="Enter article introduction"
                value={introducemd}
                onChange={changeIntroduce}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="Publish Date"
                  size="large"
                  defaultValue={dayjs()}
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
