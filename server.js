import express from './src';
const app = express();

app.get('/get', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  console.log('server started');
});