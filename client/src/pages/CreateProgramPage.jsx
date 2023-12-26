import React, {useEffect, useState} from 'react';
import {Typography, TextField, IconButton, Grid, Paper, Box} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {useParams} from "react-router-dom";
import axios from "axios";
import Workout from "../models/Workout.js";
import WorkoutProgram from "../models/WorkoutProgram.js";
import Exercise from "../models/Exercise.js";

const CreateProgramPage = () => {
    const { programId } = useParams();
    const [program, setProgram] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(true); // State to track authorization

    useEffect(() => {
        const fetchProgramData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`/api/draft-workout-program/${programId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const processedProgram = processProgramData(response.data);
                setProgram(processedProgram);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    setIsAuthorized(false); // Unauthorized access
                } else {
                    console.error('Error fetching program data:', error);
                }
            }
        };

        fetchProgramData();
    }, [programId]);

    const processProgramData = (data) => {
        // Iterate over weeklySchedules and instantiate Workout and Exercise objects
        console.log(data)
        const weeklySchedules = data.weeklySchedules.map(week => {
            const processedWeek = {};
            for (const day in week) {
                processedWeek[day] = week[day].map(workoutData => {
                    const exercises = workoutData.exercises.map(exerciseData => new Exercise(exerciseData));
                    return new Workout({ ...workoutData, exercises });
                });
            }
            return processedWeek;
        });
        const workoutProgam = new WorkoutProgram({ ...data, weeklySchedules });
        if(weeklySchedules.length === 0) {
            workoutProgam.weeklySchedules.push(workoutProgam.createEmptyWeek())
        }
        return workoutProgam
    };

    if (!program) {
        return <div>Loading...</div>;
    }


    if (!isAuthorized) {
        return <div>Error: Invalid Workout Program</div>;
    }
    const handleAddWeek = () => {
        const updatedProgram = new WorkoutProgram({...program});

        // Use the `createEmptyWeek` method to add a new week
        updatedProgram.weeklySchedules.push(updatedProgram.createEmptyWeek());

        // Update the state with the new program
        setProgram(updatedProgram);
    };

    const handleRemoveWeek = (weekIndex) => {
        const updatedProgram = new WorkoutProgram({...program});

        // Remove the week at the specified index
        if (weekIndex >= 0 && weekIndex < updatedProgram.weeklySchedules.length) {
            updatedProgram.weeklySchedules.splice(weekIndex, 1);
        }

        // Update the state with the new program
        setProgram(updatedProgram);
    };


    return (
        <div style={{ padding: 20, height: "100%", alignSelf: "flex-start"}}>
            <Typography variant="h4" gutterBottom>
                Create Program
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Program Title"
                        value={program.name}
                        onChange={(e) => setProgram({...program, name:event.target.value})}
                        InputProps={{
                            endAdornment: <EditIcon color="action" />
                        }}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                </Grid>
                {/* Other grid items can go here if needed */}
            </Grid>

            <Grid container spacing={0} sx={{marginTop: "-10px"}}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Program Description"
                        value={program.description}
                        onChange={(e) => setProgram({...program, description:event.target.value})}
                        InputProps={{
                            endAdornment: <EditIcon color="action" />
                        }}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Grid>
                {/* Other grid items can go here if needed */}
            </Grid>

            {program.weeklySchedules.map( (week, weekNumber) => (
                <Paper key={weekNumber} style={{ paddingLeft: 25, paddingTop: 10, paddingBottom: 10, paddingRight: 10, marginTop: 10 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <Typography>Week {weekNumber + 1}</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <IconButton color="secondary" onClick={() => handleRemoveWeek(weekNumber)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </Grid>

                        {/* Placeholder for workout cards */}
                        <Grid container spacing={2}>
                            {Object.keys(week).map((day, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={12/7}>
                                    <Paper style={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h6" style={{ marginTop: '10px' }}>
                                            {day}
                                        </Typography>

                                        {week[day].length === 0
                                            ? (
                                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
                                                    <IconButton color="primary" onClick={handleAddWeek}>
                                                        <AddCircleOutlineIcon fontSize="large" />
                                                    </IconButton>
                                                </Box>
                                            )
                                            : null
                                        }
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            ))}
            <IconButton
                color="primary"
                onClick={handleAddWeek}
                sx={{ marginTop: '15px' }} // Adjust the value as needed
            >
                <AddCircleOutlineIcon fontSize="large" />
            </IconButton>

        </div>
    );
};

export default CreateProgramPage;
