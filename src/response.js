import http from 'http';

const response = {
  __proto__: http.ServerResponse.prototype
};

response.send = function (msg) {
  this.writeHead(200, {'Content-Type': 'text/html'});
  this.end(msg);
};

export default response;
