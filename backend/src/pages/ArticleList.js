import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/style/ArticleList.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
const { confirm } = Modal;

export default function ArticleList() {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [articleNum, setArticleNum] = React.useState();
  const navigate = useNavigate();

  useEffect(() => {
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
        withCredentials: true,
        header: { "Access-Control-Allow-Origin": "*" },
      });

      if (response.data.data == "No Login") {
        localStorage.removeItem("openId");
        navigate("/");
      } else {
        setList(response.data.data);
      }
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

  function delArticle(id) {
    confirm({
      title: "Are you sure you want to delete the article?",
      content: "If you click OK, the article will be deleted.",
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          (res) => {
            message.success("The article is deleted.");
            getArticleCount();
            getArticle();
          }
        );
      },
      onCancel() {
        message.success("Deletion canceled");
      },
    });
  }

  function updateArticle(id, checked) {
    navigate(`/index/add/${id}`);
  }

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>Title</b>
            </Col>
            <Col span={4}>
              <b>Type</b>
            </Col>
            <Col span={4}>
              <b>Publish Time</b>
            </Col>
            <Col span={4}>
              <b>Visits</b>
            </Col>
            <Col span={4}>
              <b>Actions</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{item.addTime}</Col>
              <Col span={4}>
                <b>{item.view_count}</b>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => [updateArticle(item.id)]}>
                  Edit
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
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
