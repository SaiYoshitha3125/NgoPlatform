import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import Signup from "./pages/Signup";
import MemberDashboard from './pages/MemberDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminVolunteers from './pages/AdminVolunteers';
import AdminMembers from './pages/AdminMembers';
import AdminDonations from './pages/AdminDonations';
/*hiiii*/

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.startsWith('/admin-') || location.pathname.startsWith('/volunteer-') || location.pathname.startsWith('/donor-');

  return (
    <div className="app">
      {!isDashboard && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/member-dashboard" element={<MemberDashboard />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer-tasks" element={<VolunteerDashboard />} />
          <Route path="/volunteer-profile" element={<VolunteerDashboard />} />
          <Route path="/volunteer-events" element={<VolunteerDashboard />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/donor-donations" element={<DonorDashboard />} />
          <Route path="/donor-impact" element={<DonorDashboard />} />
          <Route path="/donor-profile" element={<DonorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-volunteers" element={<AdminVolunteers />} />
          <Route path="/admin-members" element={<AdminMembers />} />
          <Route path="/admin-donations" element={<AdminDonations />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      <style>{`
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default App;