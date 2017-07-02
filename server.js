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

app.post('/post', (req, res) => {
  res.send(req.body);
});

app.delete('/delete', (req, res) => {
  res.send(req.body);
});

app.put('/put', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('server started');
});