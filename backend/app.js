import express from 'express'
import router from './routes/products.js';


const app = express();

//middlewares
app.use(express.json());
app.use('/api/v1',router);

export default app;