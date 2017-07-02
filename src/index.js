import http from 'http';
import url from 'url';
import response from './response';

const express = () => {
  const app = (req, res) => {
    // req: IncomingMessage
    // res: ServerResponse, 为其制定__proto__,绑定一些函数给他
    res.__proto__ = response;
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const method = req.method.toLowerCase();
    req.path = pathname;
    req.query = urlObj.query;
    req.hostname = req.headers['host'].split(':')[0];
    if (app.route.path === pathname && app.route.method === method) {
      app.route.fn(req, res);
    }
  };

  app.get = (path, fn) => {
    const config = { method: 'get', path, fn };
    app.route = config;
  };

  app.listen = (port, fn) => {
    // http.createServer(app)
    // app是一个会被自动绑定到request事件的函数，称作requestListener
    // 返回一个http.Server的实例
    http.createServer(app).listen(port, fn);
  };

  return app;
};

export default express;
