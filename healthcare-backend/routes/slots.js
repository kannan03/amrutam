const express = require("express");
const pool = require("../db");

const router = express.Router();

// Create slot
router.post("/", async (req, res) => {
  const { doctor_id, date, startTime, endTime, specialization } = req.body;
  console.log("==============tttt", req.body);
  try {
    const result = await pool.query(
      "INSERT INTO doctor_slots (doctor_id, date, start_time, end_time, specialization) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [doctor_id, date, startTime, endTime, specialization]
    );
    console.log("doctor_slots create success");

    res.json(result.rows[0]);
  } catch (err) {
    console.log("eeeeeeeee", err)
    res.status(500).json({ error: err.message });
  }
});

// Get slots for a doctor
router.get("/:doctorId", async (req, res) => {
  try {
    let DID = req.params.doctorId;
    console.log("DID=====",DID)
    const result = await pool.query(` select ds.*, u.name from  doctor_slots as ds left join users as u ON ds.doctor_id = u.id where ds.doctor_id = '${DID}' AND ds.is_available = TRUE`, 
    )
    const Data = JSON.parse(JSON.stringify(result.rows));
    const converted = Data.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }), // YYYY-MM-DD
      created_at: new Date(item.created_at).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
    }));
        console.log("iiiiiii",converted)
    res.json(converted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(` select distinct u.name, u.id, ds.specialization, ds.doctor_id from  doctor_slots as ds left join users as u ON ds.doctor_id = u.id where  ds.is_available = TRUE`, 
    )
    console.log("iiiiiii",result.rows)
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
