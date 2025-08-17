import axios from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Example POST request (Register)
export const registerUser = (data) => API.post("/auth/register", data);

// Example POST request (Login)
export const loginUser = (data) => API.post("/auth/login", data);

// Example POST request (Create Slot)
export const createSlot = (data) => API.post("/slots", data);

// Example GET request (Get Slots by Doctor ID)
export const getDoctorSlots = (doctorId) => API.get(`/slots/${doctorId}`);

export const getAllSlots = () => API.get(`/slots`);

export const getDoctorList = () => API.get(`/doctors`);

// Example POST request (Book Appointment)
export const bookAppointment = (data) => API.post("/appointments", data);

// Example GET request (Get Appointments by User ID)
export const getUserAppointments = (userId) => API.get(`/appointments/user/${userId}`);
