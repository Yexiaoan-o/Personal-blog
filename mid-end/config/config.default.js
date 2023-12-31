/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1697553370779_2284';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '12345678',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 跨域配置1
  config.security ={
    csrf:{
      enable: false
    }, 
    domainWhiteList:['*']
  };

  // 跨域配置2
  config.cors = {
    origin:'*',
    credentials: true,
    allowMethods:'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS'
  }


  return {
    ...config,
    ...userConfig,
  };
};
