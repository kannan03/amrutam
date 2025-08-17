import { createSlot, getDoctorSlots, getDoctorList } from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios  from "axios";
export default function DoctorSlot() {

  let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  let userId = user ? user.id : "";
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState({
    doctor_id : "",
    date: "",
    startTime: "",
    endTime: "",
    specialization :""
  });
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState(['Cancer', 'Dental', 'Cardiology']);

  const getTodaySlots =  ()=>{
    let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    getDoctorSlots(user?.id).then((res) => {
      console.log("22222222222222", res.data)
      setSlots(res.data)
    }
  );  
  }
  
  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      console.log("slot=========", slot);
      const res = await createSlot(slot); 
      setSlot({ doctorId: "", date: "", startTime: "", endTime: "" });
      getTodaySlots();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };


  useEffect(() => {
    let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;  
    if( !user){
      navigate("/login");
    }

    setSlot( { ...slot, doctor_id : user?.id});
    getTodaySlots();
    }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleAddSlot}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mb-6"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add Doctor Slot</h2>
        <input
          type="date"
          value={slot.date}
          onChange={(e) => setSlot({ ...slot, date: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="time"
          value={slot.startTime}
          onChange={(e) => setSlot({ ...slot, startTime: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="time"
          value={slot.endTime}
          onChange={(e) => setSlot({ ...slot, endTime: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        />
        {/* <select
          value={slot.doctor_id}
          onChange={(e) => setSlot({ ...slot, doctor_id: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} {doc.specialization ? (doc.specialization) : ''}
            </option>
          ))}
        </select> */}

        <select
          value={slot.specialization}
          onChange={(e) => setSlot({ ...slot, specialization: e.target.value })}
          className="w-full p-2 border rounded mb-3"
          required
        >
          <option value="">Select Special</option>
          {specialization.map((doc, index) => (
            <option key={index} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Slot
        </button>
      </form>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-3">Doctor Slots</h3>
        {slots.length === 0 ? (
          <p className="text-gray-500">No slots added yet.</p>
        ) : (
          <ul className="space-y-2">
            {slots.map((s, i) => (
              <li key={i} className="border p-2 rounded">
                <strong>Date:</strong> {s.date} | <strong>Start:</strong>{" "}
                {s.start_time} | <strong>End:</strong> {s.end_time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
