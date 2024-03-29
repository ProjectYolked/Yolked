import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginHomePage from './pages/LoginHomePage.jsx';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { lightTheme, darkTheme } from "./utils/theme.js";
import CreateProgramPage from "./pages/CreateProgramPage.jsx";
import CreateWorkoutPage from "./pages/CreateWorkoutPage.jsx";
import History from './pages/History.jsx';
// Import other necessary components and pages

function App() {
    const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = darkMode ? darkTheme : lightTheme;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <div style={{ height: "100%", width: "100vw" }}>
                        {/* TODO Header, Navigation, and other layout components can go here */}
                        <Routes>
                            <Route path="/login" element={<LoginHomePage theme={theme} />} />
                            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                            <Route path="/create-program/:programId" element={<ProtectedRoute><CreateProgramPage /></ProtectedRoute>} />
                            <Route path="/create-workout/:programId" element={<ProtectedRoute><CreateWorkoutPage /></ProtectedRoute>} />
                            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                            {/* TODO add a default route for a 404 Not Found page */}
                        </Routes>

                        {/* Footer or other layout components */}
                    </div>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>

    );
}

export default App;
