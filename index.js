'use strict';

import { connectDB, pool } from './db.js'; // Import the connect function and pool
import express from "express";
import dotenv from 'dotenv'
// import { connectDB, pool } from './db.js';
import cors from 'cors'
import { surveyRouter } from "./routes/Survey.js";
import { orgCustomerRouter } from "./routes/OrgCustomer.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000

app.use('/survey',surveyRouter)

app.use('/orgCustomer',orgCustomerRouter)

app.get("/", (req, res) => {
  res.send("Hello i am started");
});


app.listen(PORT, () => {
  console.log(`server started in localhost:${PORT}`);
});



// Connect to the database
connectDB();

// Sample function to handle a request
export async function hello(event) {
  let response;
  try {
    console.log('hii');
    
    // const result = await pool.query('SELECT NOW()'); // Simple query to get the current time
    // response = {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: 'Hello from Serverless!',
    //     time: result.rows[0].now,
    //   }),
    // };
  } catch (error) {
    // console.error('Database query error', error.stack);
    // response = {
    //   statusCode: 500,
    //   body: JSON.stringify({
    //     message: 'Internal Server Error',
    //   }),
    // };
  }

  return response;
}


// index.js

// // Connect to the database
connectDB();

// // Example query function
// const getUsers = async () => {
//   try {
//     const res = await pool.query('SELECT * FROM users'); // Replace 'users' with your table name
//     console.log(res.rows);
//   } catch (error) {
//     console.error('Error executing query', error.stack);
//   }
// };

// // Call the example function
// getUsers().then(() => {
//   pool.end(); // Close the pool after the operation
// });
