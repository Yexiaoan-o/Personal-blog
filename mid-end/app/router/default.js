
module.exports = app=> {
  const {router, controller} = app
  router.get('/default/index', controller.default.home.index)
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleListByPageNum', controller.default.home.getArticleListByPageNum)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
  router.get('/default/getArticleCount', controller.default.home.getArticleCount)
}