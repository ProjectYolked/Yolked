import React, { useState } from 'react';
import { Modal, Box, IconButton, TextField, InputAdornment, Select, MenuItem, Divider, Typography, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const muscleGroups = ['Chest', 'Back', 'Legs']; // Temporary list for dropdown
const url = "https://cdn-icons-png.flaticon.com/512/2548/2548437.png"
const initialExercises = [
    { title: 'Bench Press', image: url, description: 'Chest exercise focusing on pectoral muscles' },
    { title: 'Deadlift', image: url, description: 'Full body exercise, focusing on back and legs' },
    { title: 'Squats', image: url, description: 'Leg exercise, primarily targeting the quadriceps' },
    { title: 'Pull Ups', image: url, description: 'Upper body exercise for back and biceps' },
    { title: 'Bicep Curls', image: url, description: 'Isolated exercise for bicep muscles' },
    { title: 'Tricep Dips', image: url, description: 'Upper body exercise targeting the triceps' },
    { title: 'Shoulder Press', image: url, description: 'Shoulder exercise targeting deltoids' },
    { title: 'Lunges', image: url, description: 'Lower body exercise for legs and glutes' },
    { title: 'Leg Press', image: url, description: 'Leg exercise targeting quadriceps, hamstrings, and glutes' },
    { title: 'Lat Pulldowns', image: url, description: 'Back exercise focusing on latissimus dorsi' },
    { title: 'Seated Rows', image: url, description: 'Back exercise targeting the middle back muscles' },
    { title: 'Leg Extensions', image: url, description: 'Isolated exercise for quadriceps' },
    { title: 'Calf Raises', image: url, description: 'Exercise focusing on calf muscles' },
    { title: 'Plank', image: url, description: 'Core exercise for abdominal muscles and stability' },
    { title: 'Russian Twists', image: url, description: 'Core exercise targeting oblique muscles' },
    // ... Add more exercises as needed
];
const CreateExerciseModal = ({ onExerciseSelect }) => {
    const [open, setOpen] = useState(false);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All Muscles');
    const [searchTerm, setSearchTerm] = useState('');
    const [exercises, setExercises] = useState(initialExercises);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleMuscleGroupChange = (event) => setSelectedMuscleGroup(event.target.value);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        const filteredExercises = event.target.value
            ? initialExercises.filter(exercise =>
                exercise.title.toLowerCase().includes(event.target.value.toLowerCase()))
            : initialExercises;
        setExercises(filteredExercises);
    };

    const handleExerciseClick = (exercise) => {
        handleClose();
        onExerciseSelect(exercise);
    };

    return (
        <div>
            <IconButton
                color="primary"
                onClick={() => handleOpen()}
                sx={{ marginTop: '15px' }}
            >
                <AddCircleOutlineIcon fontSize="large" />
            </IconButton>


            <Modal open={open} onClose={handleClose}>
                <Box data-modal="true" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', p: 4, display: 'flex', flexDirection: 'column', height: '80vh' }}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <Select
                            value={selectedMuscleGroup}
                            onChange={handleMuscleGroupChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Muscle Groups' }}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="All Muscles">All Muscles</MenuItem>
                            {muscleGroups.map(group => (
                                <MenuItem key={group} value={group}>{group}</MenuItem>
                            ))}
                        </Select>

                        <Divider sx={{ my: 2 }}>
                            <Typography>
                                {selectedMuscleGroup === 'All Muscles' ? 'All Exercises' : `All ${selectedMuscleGroup} Exercises`}
                            </Typography>
                        </Divider>
                    </Box>

                    <Box sx={{ overflowY: 'auto'}}>
                        <Table>
                            <TableBody>
                                {exercises.map((exercise, index) => (
                                    <TableRow key={index} sx={{ '&:hover': { cursor: 'pointer' }, textAlign: 'center' }}>
                                        <TableCell>
                                            <img src={exercise.image} alt={exercise.title} style={{ height: '50px' }} />
                                        </TableCell>
                                        <TableCell onClick={() => handleExerciseClick(exercise)} sx={{
                                            paddingRight: "8%",
                                            textAlign: 'center',
                                            fontSize: '1.1rem' }}>
                                            {exercise.title}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center'}}>
                                            <Tooltip title={exercise.description}>
                                                <InfoIcon />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateExerciseModal;
