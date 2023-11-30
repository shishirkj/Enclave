import app from "./app.js"
import { config } from "dotenv";
import connectDB from "./data/database.js";

  
config({
  path: "C:/Users/reach/Desktop/enclave/backend/data/config.env",
});



connectDB();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
console.log(`server running on ${process.env.PORT}`)
})
