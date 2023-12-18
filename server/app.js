import express from 'express'
import router from './routes/products.js';
import { errorMiddleware } from './middlewares/error.js';
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import orderRoute from './routes/orderRoutes.js';
import payRoute from './routes/paymentRoutes.js';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { config } from "dotenv";


const app = express();

//middlewares
app.use(cookieParser())
app.use(express.json())

config({
    path: "C:/Users/reach/Desktop/enclave/server/data/config.env",
  });
  
  
app.use(cors({
    origin: "http://localhost:5173",  // Update with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(fileUpload());




app.use('/api/v1',router);
app.use('/api/v1',userRoute)
app.use('/api/v1',orderRoute)
app.use('/api/v1',payRoute)



//error handler
app.use(errorMiddleware)

export default app;