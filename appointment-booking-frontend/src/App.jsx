import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterChoice from "./pages/RegisterChoice";
import { useAuth } from "./hooks/useAuth";
import Testimonial from "./pages/Testimonial";
import Chatbot from "./components/chat/Chatbot";

function App() {
  const { isAuthenticated, isOwner } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/:type" element={<Register />} />
          {isAuthenticated && (
            <Route path="/appointments" element={<Appointments />} />
          )}
          {isOwner && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}

export default App;
