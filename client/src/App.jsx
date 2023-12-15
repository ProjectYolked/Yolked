import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginHomePage from './pages/LoginHomePage.jsx';
<<<<<<< HEAD
=======
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from './pages/SignInPage.jsx'
>>>>>>> 5b41a96f4897999af88268144adf5efd7e23234a
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { lightTheme, darkTheme } from "./utils/theme.js";
// Import other necessary components and pages

function App() {
    const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <div>
                        {/* TODO Header, Navigation, and other layout components can go here */}
                        <Routes>
                            <Route path="/login" element={<LoginHomePage theme={theme} />} />
                            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
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
