import mongoose from "mongoose";
import dotenv from "dotenv"
import app from "../server.js"


dotenv.config()
let server
const TestPort=5001
export const baseUrl=`http://localhost:${TestPort}`


before(async()=>{
  try {
    await  mongoose.connect(process.env.DB_test_URL)
  server= app.listen(TestPort);

  } catch (error) {
    console.log(error)
  }
  
})

after(async()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
})