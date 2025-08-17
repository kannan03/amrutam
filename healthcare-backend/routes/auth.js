const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password_hash, role } = req.body;
  console.log("====================", req.body)
  try {
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role || "patient"]
    );
    console.log("sssssssssssss");
    res.json(result.rows[0]);
  } catch (err) {
    console.log("eeeeeeeee", err)
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("====================", req.body)

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];
    console.log("11111111111", user)
    const match = await bcrypt.compare(password, user.password_hash);
    console.log("222222222222", match)

    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email : user.email,  role: user.role }, "secret-sign", {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.log("eeeeeee", err)
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
