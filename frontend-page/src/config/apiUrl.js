let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
  getArticleList : ipUrl + 'getArticleList',
  getArticleListByPageNum : ipUrl + 'getArticleListByPageNum',
  getArticleById : ipUrl + 'getArticleById/',
  getTypeInfo : ipUrl + 'getTypeInfo',
  getArticleCount: ipUrl + 'getArticleCount'
}

export default servicePath