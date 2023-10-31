"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = "hi api";
  }

  async checkLogin() {
    let username = this.ctx.request.body.username;
    let password = this.ctx.request.body.password;
    const sql =
      "SELECT username FROM admin_user WHERE username = '" +
      username +
      "' AND password = '" +
      password +
      "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId: openId };
      this.ctx.body = { data: "Successful login", openId: openId };
    } else {
      this.ctx.body = { data: "Failed login" };
    }
  }

  async getArticleCount(){
    let sql = 'SELECT COUNT(id) FROM article';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType };
  }

  async addArticle() {
    let temArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert("article", temArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId,
    };
  }

  async updateArticle() {
    let temArticle = this.ctx.request.body;
    const result = await this.app.mysql.update("article", temArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
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
      "ORDER BY article.id DESC ";

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: res };
  }

  async getArticleById() {
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
}

module.exports = MainController;
