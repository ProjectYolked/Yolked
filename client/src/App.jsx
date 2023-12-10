import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute'; // This will also need to be updated for v6
// Import other necessary components and pages

function App() {
    return (
        <BrowserRouter>
            <div>
                {/* TODO Header, Navigation, and other layout components can go here */}

                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    {/* TODO add a default route for a 404 Not Found page */}
                </Routes>

                {/* Footer or other layout components */}
            </div>
        </BrowserRouter>
    );
}

export default App;
