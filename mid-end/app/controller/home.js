'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    const {ctx} = this;
    ctx.body = '<h1>an blog</h1>'
  }
}

module.exports = HomeController;
