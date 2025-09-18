const pool = require("../config/db");
const jwt = require("jsonwebtoken");

// Register User
async function registerUser(fullName, email, phone, organization, password, userType) {
  // 1. check if user exists
  try{
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      throw new Error("User already exists");
    }
    // 2. insert new user
    await pool.query("INSERT INTO users (full_name, email, phone, organization, password, user_type) VALUES ($1, $2, $3, $4, $5, $6)", [fullName, email, phone, organization, password, userType]);

    return { message: "User registered successfully" };
  }catch(err){
    console.error("Error in registerUser:", err);
    throw err;
  }
}

// Login User
async function loginUser(email, password) {
  const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userQuery.rows.length === 0) {
    throw new Error("User not found");
  }
  const usser = userQuery.rows[0];
  if(usser.password !== password) {
    throw new Error("Invalid credentials");
  }
  return {
    id: usser.id,
    email: usser.email,
    fullName: usser.full_name,
    phone: usser.phone,
    organization: usser.organization,
    userType: usser.user_type
  };
}

module.exports = { registerUser, loginUser };
