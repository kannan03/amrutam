const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const slotRoutes = require("./routes/slots");
const appointmentRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes init
app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
