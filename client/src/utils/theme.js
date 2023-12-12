import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3c46ff', // Standard Issue Button blue
        },
        secondary: {
            main: '#00002e', // Dark blue
        },
        background: {
            default: '#00002e', // Dark blue
            paper: '#000000', // Black
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

export default theme;