import { useEffect, useState } from "react";
import {  getDoctorSlots, deleteAppointment, getAllSlots, bookAppointment, getUserAppointments } from "../api";
import { useNavigate } from "react-router-dom";

export default function Appointment() {
  let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  let userId = user ? user.id : "";
  if( !userId){
    const navigate = useNavigate();
    navigate("/login");
  }

  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    user_id: userId,
    doctor_id: "",
    slot_id : "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const [ doctorSlots, setDoctorSlots] = useState([]);

  const [ timeSlots, setTimeSlots] = useState([]);

  const handleBook = (e) => {
    e.preventDefault();

    let Times = timeSlots.filter((ele)=>{
      return ele.id == form.slot_id;
    });

  console.log("timeSlots==============",timeSlots)
  console.log("form==============",form)
  console.log("TTTTTTTTTTTTT",Times[0]['start_time'])

  let formData = { ...form, start_time : Times[0]['start_time'], end_time : Times[0]['end_time']};

  bookAppointment(formData).then((res)=>{
    console.log("create Appointment!");
    getAllAppointment();
    setForm({ user_id: "", doctor_id: "", slot_id : "", date: "", start_time: "", end_time: "" });
  
  });

  };


  const getAllAppointment =  ()=>{
    let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    getUserAppointments(user?.id).then((res) => {
      console.log("getAllAppointment==============", res.data)
      setAppointments(res.data)
    }
  );  
  }

  useEffect(()=>{
    getAllAppointment();
  }, []);


  useEffect(()=>{

    getAllSlots().then((res) => {
      console.log("getAllslots=============", res.data)
      setDoctorSlots(res.data)
    });  

    getDoctorSlots(2).then((res)=>{
      console.log("TimeSlots=======", res.data);
      setTimeSlots(res.data)
    });


  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
       {
        user && user.role === "doctor" && (
          <>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-3">Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments booked yet.</p>
        ) : (
          <ul className="space-y-2">
            {appointments.map((a, i) => {
              if( a.doctor_id === user?.id){
                (
                  <li key={i} className="border p-2 rounded">
                    <strong>Patient:</strong> {a.user_id} |{" "}
                    <strong>Doctor:</strong> {a.doctor_id} |{" "}
                    <strong>Date:</strong> {a.date} |{" "}
                    <strong>Time:</strong> {a.start_time} - {a.end_time}
                  </li>
                )  
              }
            })}
          </ul>
        )}
      </div>
</>
        )
       } 

              {
        user && user?.role === "user" && (
          <>
                        <form
              onSubmit={handleBook}
              className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mb-6"
            >
              <h2 className="text-xl font-bold mb-4 text-center">Book Appointment</h2>
      
              {/* <input
                type="text"
                placeholder="Patient Name"
                value={form.user_id}
                onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                required
              /> */}
      
              {/* <input
                type="text"
                placeholder="Doctor"
                value={form.doctor_id}
                onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                required
              /> */}
        <select
          value={form.doctor_id}
          onChange={(e) => {
            setForm({ ...form, doctor_id: e.target.value })
            console.log("e.target.value=======", e.target.value);

            getDoctorSlots(e.target.value).then((res)=>{
                console.log("TimeSlots=======", res.data);
                setTimeSlots(res.data)
            });
          }

          }
          className="w-full p-2 border rounded mb-3"
          required
        >
          <option value="">Select Doctor</option>
          {doctorSlots.map((doc, index) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} - {"| "} { doc.specialization}
            </option>
          ))}
        </select>

        <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                required
              />


<select
          value={form.slot_id}
          onChange={(e) => {
            setForm({ ...form, slot_id: e.target.value })
            console.log("e.target.value=======", e.target.value);
        
          }

          }
          className="w-full p-2 border rounded mb-3"
          required
        >
          <option value="">Time</option>
          {timeSlots.map((doc, index) => (
            <option key={doc.id} value={doc.id}>
              {doc.start_time} | {" to"} { doc.end_time}
            </option>
          ))}
        </select>

              {/* 
      
              <input
                type="time"
                value={form.start_time}
                onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                required
              />
      
              <input
                type="time"
                value={form.end_time}
                onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                className="w-full p-2 border rounded mb-3"
                required
              /> */}
      
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Book Appointment
              </button>
            </form>

            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-3">Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No Appointments added yet.</p>
        ) : (
<ul className="space-y-2">
  {appointments.map((s, i) => (
    <li key={i} className="border p-3 rounded flex justify-between items-center">
      <div>
        <strong>Date:</strong> {s.date} |{" "}
        <strong>Start:</strong> {s.start_time.replace(":00", "")} |{" "}
        <strong>End:</strong> {s.end_time.replace(":00", "")}
      </div>

      <button
        onClick={() => {
          deleteAppointment(s.id).then((res) => {
            console.log("Deleted appointment:", s.id);
            getAllAppointment()
          });
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition duration-200"
      >
        Delete
      </button>
    </li>
  ))}
</ul>
        )}
      </div>
</>
        )
       }      
    </div>
  );
}
