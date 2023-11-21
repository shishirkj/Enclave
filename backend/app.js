import express from 'express'
import router from './routes/products.js';
import { errorMiddleware } from './middlewares/error.js';
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1',router);
app.use('/api/v1',userRoute)



//error handler
app.use(errorMiddleware)

export default app;