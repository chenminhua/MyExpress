import express from './src';
const app = express();
import bodyParser from './lib/bodyParser';

app.use(bodyParser());

app.get('/get', (req, res) => {
  if (req.query.a) {
    return res.send(req.query);
  }
  res.send('hello');
});

// app.post('/post', (req, res) => {
//   console.log('[LOG]', req.body);
//   res.send('this is post method');
// });

app.listen(3000, () => {
  console.log('server started');
});