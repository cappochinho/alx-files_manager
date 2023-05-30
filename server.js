const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app
  .use(routes)
  .get('/', (req, res) => res.send('Express'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});