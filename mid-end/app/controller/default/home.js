"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api hi";
  }

  async getArticleListByPageNum() {
    const pageNum = parseInt(this.ctx.query.pageNum) || 1;
    const pageSize = parseInt(this.ctx.query.pageSize) || 4;
    const offset = (pageNum - 1) * pageSize
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "ORDER BY article.id DESC " +
      `LIMIT ${pageSize} OFFSET ${offset}`;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result
    };
  }

  async getArticleList() {

    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "ORDER BY article.id DESC "

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };
  }


  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id;

    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }

  async getArticleCount(){
    let sql = 'SELECT COUNT(id) FROM article';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

  }
}

module.exports = HomeController;
