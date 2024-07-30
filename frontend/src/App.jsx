import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import { Dashboard } from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (

        <BrowserRouter>
            <Routes>
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
