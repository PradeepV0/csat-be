const { Pool } = require('pg');

// Create a new pool instance with your database configuration
const pool = new Pool({
    host:  "pg-test.c1amscoaucml.ap-southeast-2.rds.amazonaws.com",
    user:  "sarbajirapg",
    port:  5432,
    password:  "Postgres123",
    database:  "postgres",
    ssl: { rejectUnauthorized: false }
  });

// Function to connect to the database
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Function to query the database
const query = async (text, params) => {
  const res = await pool.query(text, params);
  console.log(res);  
  return res;
};

// Export the connection and query function
module.exports = {
  connectDB,
  query,
  pool
};
