import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { env } from './env/index';
import { authRouter } from './routes/auth-router';
import { weddingsRouter } from './routes/weddings-router';
import { giftsRouter } from './routes/gifts-router';
import { guestRequestsRouter } from './routes/guest-requests-router';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './docs/swagger';

dotenv.config();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/weddings', weddingsRouter);
app.use('/gifts', giftsRouter);
app.use('/guest-requests', guestRequestsRouter);
app.use('/wgl-app-api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
const port = env.PORT || 3333;

app.listen(port, () => {
  console.log(`Application running on ${port}`);
});
