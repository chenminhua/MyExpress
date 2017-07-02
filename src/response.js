import http from 'http';

const response = {
  __proto__: http.ServerResponse.prototype
};

response.send = function (msg) {
  if (typeof msg === 'object'){
    this.writeHead(200, {'Content-Type': 'application/json'});
    this.end(JSON.stringify(msg));
  }
  this.writeHead(200, {'Content-Type': 'text/html'});
  this.end(msg);
};

export default response;
