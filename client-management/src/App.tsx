import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import Meetings from "./components/Meetings";
import { AppProvider } from "./context/AppContext";  // Import the context provider

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/clients" />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/meetings" element={<Meetings />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
