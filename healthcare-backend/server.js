const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const slotRoutes = require("./routes/slots");
const appointmentRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

// Public route
app.use("/api/auth", authRoutes);

// Protected routes (require token)
app.use("/api/slots", authMiddleware, slotRoutes);
app.use("/api/appointments", authMiddleware, appointmentRoutes);
app.use("/api/doctors", authMiddleware, doctorRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
