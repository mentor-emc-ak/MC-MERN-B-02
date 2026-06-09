import express from 'express';
import { run } from './database.js';

const app = express();
const port = 3000;

run().catch(console.dir);


app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
