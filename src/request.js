import http from 'http';

const request = {
  __proto__: http.IncomingMessage.prototype
};

export default request;