import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { env } from './env/index.js';

dotenv.config();
app.use(express.json());

const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application running on ${port}`);
});
