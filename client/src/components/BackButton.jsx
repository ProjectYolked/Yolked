import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ to }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(to);
    };

    return (
        <IconButton onClick={handleBack}>
            <ArrowBackIcon sx={{ color: 'text.primary' }}/>
        </IconButton>
    );
};

export default BackButton;
