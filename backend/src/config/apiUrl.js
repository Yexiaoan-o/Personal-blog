let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
  checkLogin : ipUrl + 'checkLogin', // 检查用户名和密码
  getTypeInfo : ipUrl + 'getTypeInfo', // 获得文章类别信息
  addArticle : ipUrl + 'addArticle', // 添加文章
  updateArticle: ipUrl + 'updateArticle', // 修改文章内容
  getArticleList: ipUrl + 'getArticleList',
  delArticle: ipUrl + 'delArticle/',
  getArticleById : ipUrl + 'getArticleById/',
  getArticleListByPageNum : ipUrl + 'getArticleListByPageNum',
  getArticleCount : ipUrl + 'getArticleCount'
}

export default servicePath