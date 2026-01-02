import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { env } from './env/index.js';
import { authRouter } from './routes/auth-routes.js';

dotenv.config();
app.use(express.json());
app.use('/auth', authRouter);

const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application running on ${port}`);
});
