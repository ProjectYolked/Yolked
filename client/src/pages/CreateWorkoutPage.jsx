import React, {useEffect, useState} from 'react';
import {Typography, TextField, IconButton, Grid, Paper, Box} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import Workout from "../models/Workout.js";
import WorkoutProgram from "../models/WorkoutProgram.js";
import Exercise from "../models/Exercise.js";
import CreateExerciseModal from "../components/CreateExerciseModal.jsx";
import BackButton from "../components/BackButton.jsx";

const CreateWorkoutPage = () => {
    const [workout, setWorkout] = useState(new Workout({}));
    const [weekIndex, setWeekIndex] = useState(0);
    const [day, setDay] = useState('');

    const [isAuthorized, setIsAuthorized] = useState(true); // State to track authorization
    const { programId } = useParams();
    const location = useLocation();
    const { programData } = location.state || {};
    console.log(programData)

    useEffect(() => {
        if (programData === undefined) {
            setIsAuthorized(false)
            return
        }
        // Check if programData.weekIndex is available before setting
        if (programData.weekIndex) {
            setWeekIndex(programData.weekIndex);
        } else {
            setWeekIndex('')
        }
        // Check if programData.day is available before setting
        if (programData.day) {
            setDay(programData.day);
        } else {
            setDay('')
        }
        // Check if programData.workout is available before setting
        if (programData.workout) {
            setWorkout(new Workout(programData.workout));
        } else {
            setWorkout(new Workout({}))
        }

        // You can use weekIndex and day here as needed

    }, [programData]); // Dependency array includes programData

    if (!isAuthorized) {
        return <div>Error: You do not own the workout program you are trying to modify</div>;
    }
    const handleAddExercise = (exercise) => {
        const updatedWorkout = new Workout({...workout});
        const parseExercise = new Exercise({name: exercise.name, sets: [], muscleGroups: []})
        updatedWorkout.exercises.push(parseExercise)

        // Update the state with the new workout
        setWorkout(updatedWorkout);
    };

    const handleRemoveExercise = (exerciseIndex) => {
        const updatedWorkout = new Workout({...workout});

        // Remove the week at the specified index
        if (exerciseIndex >= 0 && exerciseIndex < updatedWorkout.exercises.length) {
            updatedWorkout.exercises.splice(exerciseIndex, 1);
        }

        // Update the state with the new program
        setWorkout(updatedWorkout);
    };


    return (
        <div style={{ padding: 20, height: "100%", alignSelf: "flex-start"}}>
            <Grid container spacing={0}>
                <Grid item xs={.5}>
                    <BackButton to={`/create-program/${programId}`}></BackButton>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h4" gutterBottom>
                        Create Workout
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Workout Title"
                        value={workout.name}
                        onChange={(e) => setWorkout({...workout, name:event.target.value})}
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
                        label="Workout Description"
                        value={workout.description}
                        onChange={(e) => setWorkout({...workout, description:event.target.value})}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={2}
                        fullWidth
                    />
                </Grid>
            </Grid>
            {workout.exercises.map( (exercise, exerciseIndex) => (
                <Paper key={exerciseIndex} style={{ paddingLeft: 25, paddingTop: 10, paddingBottom: 10, paddingRight: 10, marginTop: 10 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <Typography>{exerciseIndex + 1}. {exercise.name}</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <IconButton color="secondary" onClick={() => handleRemoveExercise(exerciseIndex)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </Grid>

                        {/* Placeholder for workout cards */}
                        <Grid container spacing={2}>
                            {exercise.sets.map((set, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={12/7}>
                                    <Paper style={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h6" style={{ marginTop: '10px' }}>
                                            {set}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CreateExerciseModal>onExerciseSelect={handleAddExercise}</CreateExerciseModal>
            </div>

        </div>
    );
};

export default CreateWorkoutPage;
