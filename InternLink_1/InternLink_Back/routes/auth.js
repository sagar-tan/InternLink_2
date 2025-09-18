
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authService");

// Register
router.post("/register", async (req, res) => {//command to send a post request
  try {
    const { fullName, email, phone, organization, password, userType } = req.body;
    console.log("Incoming body:", req.body);
    const result = await registerUser(fullName, email, phone, organization, password, userType);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}); 

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.status(200).json({message: "Login successful", user: userData});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
