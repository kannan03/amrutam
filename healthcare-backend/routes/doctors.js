const express = require("express");
const pool = require("../db");

const router = express.Router();


// Get slots for a doctor
router.get("/:doctorId", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE doctor_id=$1", [
      req.params.doctorId,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT d.id, u.name, d.specialization FROM users as u left join doctors as d ON u.id = d.user_id where u.role= 'doctor' and d.id IS NOT NULL ");
      console.log("result.rows====",result.rows)
      res.json(result.rows);
    } catch (err) {
      console.log("error:", err)
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
