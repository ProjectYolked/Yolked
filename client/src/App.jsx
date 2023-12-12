import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginHomePage from './pages/LoginHomePage.jsx';
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
// Import other necessary components and pages

function App() {
    return (
        <CssBaseline>
        <BrowserRouter>
            <div>
                {/* TODO Header, Navigation, and other layout components can go here */}

                <Routes>
                    <Route path="/login" element={<LoginHomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    {/* TODO add a default route for a 404 Not Found page */}
                </Routes>

                {/* Footer or other layout components */}
            </div>
        </BrowserRouter>
        </CssBaseline>
    );
}

export default App;
