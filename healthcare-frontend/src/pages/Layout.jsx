import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    navigate("/login"); // redirect to login
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <div className="space-x-4">
            { user && user.role === "doctor" && (<Link to="/slots">Doctor Slots</Link>)}
            { user && user.role && (<Link to="/appointments">Appointments</Link>)}
        </div>
        <div>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
