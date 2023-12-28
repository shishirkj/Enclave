import app from "./app.js"
import { config } from "dotenv";
import connectDB from "./data/database.js";
import cloudinary from 'cloudinary';
  
config({
  path: "C:/Users/reach/Desktop/enclave/server/data/config.env",
});



connectDB();

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
console.log(`server running on ${PORT}`)
})
