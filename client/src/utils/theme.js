import {createTheme} from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#3c46ff', // Standard Issue Button blue
        },
        secondary: {
            main: '#fc7500', // Orange
        },
        background: {
            default: '#fdfdda', // Cream White
            paper: '#fdfdfd', // White
        },
        error: {
            main: '#f44336', //red
        },
        text: {
            primary: '#000000', // Black
            secondary: '#fc7500', // Orange
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
            paper: '#1B1B1B', // Black
        },
        error: {
            main: '#f44336', //red
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#d292ff', // Pink
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    // Apply styles to the root of the OutlinedInput
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // White border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Lighter white border on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // White border when focused
                        borderWidth: '1px', // You can change the border width on focus
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderColor: '#ffffff', // White border
                    '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Lighter white border on hover
                        backgroundColor: 'rgba(255, 255, 255, 0.08)', // Optional: slight background color on hover
                    },
                    '&.Mui-focused': {
                        borderColor: '#ffffff', // White border when focused
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderColor: '#ffffff', // White border color
                    borderStyle: 'solid', // Style of the border
                    borderWidth: '1px', // Width of the border
                },
            },
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