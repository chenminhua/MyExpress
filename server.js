import express from './src';
const app = express();

app.get('/get', (req, res) => {
  if (req.query.a) {
    return res.send(req.query);
  }
  res.send('hello');
});

app.listen(3000, () => {
  console.log('server started');
});