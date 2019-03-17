const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');
const proxyOpt = require('./proxy.js');
const router = require('./router.js');

const app = express();

const env = process.env.NODE_ENV || 'production';

if (env == 'development'){
  const config = require('../config/webpack.dev.js');
  const compiler = webpack(config);
  const hotMiddleware = require('webpack-hot-middleware');

  app.use(WebpackDevMiddleware(compiler,{
    publicPath: config.output.publicpath
  }));
  
  app.use(hotMiddleware(compiler,{
    heartbeat: 2500
  }));

  app.use(['/api'], proxy(proxyOpt));
}else{
  app.use(express.static('dist'));
}

app.set('view engine', 'ejs');
app.set('views' , __dirname + '/views');

app.use('/', router);

const server = app.listen(3000, 'localhost', function(){
   console.log("应用实例，访问地址为 http://%s:%s", server.address().address, server.address().port)
});

