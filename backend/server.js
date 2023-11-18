import app from "./app.js"
import { config } from "dotenv"
import connectDB from "./data/database.js";

config({ 
    path:"backend/data/config.env",
});


connectDB();


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
console.log(`server running on ${process.env.PORT}`)
})
