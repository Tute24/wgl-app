import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { env } from './env/index.js';
import { authRouter } from './routes/auth-routes.js';
import { weddingsRouter } from './routes/weddings-router.js';

dotenv.config();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/weddings', weddingsRouter);

const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application running on ${port}`);
});
