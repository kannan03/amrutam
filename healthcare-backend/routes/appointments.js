const express = require("express");
const pool = require("../db");

const router = express.Router();

// Book appointment
router.post("/", async (req, res) => {
  const { user_id, doctor_id, slot_id, date, start_time, end_time } = req.body;
  console.log("req.appointment==========", req.body)
  try {
    const result = await pool.query(
      "INSERT INTO appointments (user_id, doctor_id, slot_id, date, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) ",
      [user_id, doctor_id, slot_id, date, start_time, end_time]
    );
    // doctor_slots is_available
    const update_slot = await pool.query(`update doctor_slots set is_available = FALSE where id = '${slot_id}' `);
    res.json(result.rows[0]);
  } catch (err) {
    console.log("eeeeeeeeeeeeeeee", err)
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const {id} =  req.params;
  console.log("dddddddddddddddddd==========", id)
  try {
    const result = await pool.query(
      `delete from appointments where id = ${id}`
    );
    res.json({ msg : 'delete success'});
  } catch (err) {
    console.log("eeeeeeeeeeeeeeee", err)
    res.status(500).json({ error: err.message });
  }
});


// Get appointments for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM appointments WHERE user_id=$1", [
      req.params.userId,
    ]);

        const Data = JSON.parse(JSON.stringify(result.rows));
    const converted = Data.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }), // YYYY-MM-DD
      created_at: new Date(item.created_at).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
    }));

    res.json(converted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
