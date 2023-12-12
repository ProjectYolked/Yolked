import {createTheme} from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#3c46ff', // Standard Issue Button blue
        },
        secondary: {
            main: '#fc7500', // Dark blue
        },
        background: {
            default: '#fdfdda', // Dark blue
            paper: '#fdfdfd', // Black
        },
        error: {
            main: '#f44336', //red
        },
        text: {
            primary: '#000000', // White
            secondary: '#fc7500', // Pink
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontWeight: '600',
            fontSize: '50px',
        },
        h2: {
            fontWeight: '600',
        },
        h3: {
            fontSize: '32px',
            fontWeight: '600',
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#3c46ff', // Standard Issue Button blue
        },
        secondary: {
            main: '#d292ff', // Dark blue
        },
        background: {
            default: '#00002e', // Dark blue
            paper: '#000000', // Black
        },
        error: {
            main: '#f44336', //red
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#d292ff', // Pink
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontWeight: '600',
            fontSize: '50px',
        },
        h2: {
            fontWeight: '600',
        },
        h3: {
            fontSize: '32px',
            fontWeight: '600',
        }
    }
});