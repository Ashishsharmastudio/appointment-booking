import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterChoice from "./pages/RegisterChoice";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated, isOwner } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/:type" element={<Register />} />
          {isAuthenticated && (
            <Route path="/appointments" element={<Appointments />} />
          )}
          {isOwner && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
