import express from 'express'
import router from './routes/products.js';
import { errorMiddleware } from './middlewares/error.js';
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import orderRoute from './routes/orderRoutes.js';
import cors from 'cors'

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",  // Update with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use('/api/v1',router);
app.use('/api/v1',userRoute)
app.use('/api/v1',orderRoute)



//error handler
app.use(errorMiddleware)

export default app;