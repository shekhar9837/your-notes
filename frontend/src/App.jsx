import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import { Dashboard } from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { inject } from '@vercel/analytics';
 
inject();

function App() {
    return (

        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
                <Route path="/signin" Component={Login} />
                <Route path="/signup" Component={Signup} />
                
                {/* Protecting the /dashboard route */}
                <Route element={<ProtectedRoute />}>
                <Route path="/navbar" Component={Navbar} />
                    <Route path="/dashboard" Component={Dashboard} />
                </Route>
            </Routes>
        </BrowserRouter>
    
    );
}

export default App;
