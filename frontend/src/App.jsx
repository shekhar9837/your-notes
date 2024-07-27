import { Route, Routes, BrowserRouter } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Navbar from "./components/Navbar";
import { Dashboard } from "./Pages/Dashboard";


function App() {
 return (
    <BrowserRouter >
      <Routes>
        <Route path="/navbar" Component={Navbar} /> {/* 👈 Renders at /app/ */}
        <Route path="/login" Component={Login} /> {/* 👈 Renders at /app/ */}
        <Route path="/signup" Component={Signup} /> {/* 👈 Renders at /app/ */}
        <Route path="/dashboard" Component={Dashboard} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
