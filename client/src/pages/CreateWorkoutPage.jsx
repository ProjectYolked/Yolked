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
import CreateExerciseCard from "../components/CreateExerciseCard.jsx";

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
        console.log(programData)

        // You can use weekIndex and day here as needed

    }, [programData]); // Dependency array includes programData

    if (!isAuthorized) {
        return <div>Error: You do not own the workout program you are trying to modify</div>;
    }

    const updateExercise = async (updatedExerciseData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/exercise/${updatedExerciseData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExerciseData)
            });

            if (response.ok) {
                const updatedExercise = await response.json();
                console.log('Exercise updated successfully:', updatedExercise);
                return updatedExercise; // Return the updated exercise
            } else {
                console.error('Failed to update exercise');
                return null;
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
            return null;
        }
    };

    const postExerciseAndUpdateWorkout = async (workoutId, exerciseData) => {
        console.log("hello" + workoutId)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/exercise/${workoutId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exerciseData)
            });

            if (response.ok) {
                const newExercise = await response.json();
                console.log('Exercise created and added to workout:', newExercise);
                return newExercise._id; // Return the ID of the new exercise
            } else {
                console.error('Failed to create exercise');
                return null;
            }
        } catch (error) {
            console.error('Error posting exercise:', error);
            return null;
        }
    };

    const deleteExerciseFromWorkout = async (exerciseId, workoutId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/exercise/${exerciseId}/${workoutId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Exercise removed from workout and deleted successfully');
                // Additional logic to update UI after successful operation
            } else {
                console.error('Failed to remove and delete exercise');
            }
        } catch (error) {
            console.error('Error removing and deleting exercise:', error);
        }
    };

    const handleSelectExercise = async (exercise) => {
        console.log(exercise)
        const updatedWorkout = new Workout({...workout});
        const parseExercise = new Exercise({name: exercise.title, sets: [], muscleGroups: []})
        parseExercise.id = await postExerciseAndUpdateWorkout(updatedWorkout.id, parseExercise)
        updatedWorkout.exercises.push(parseExercise)
        // Update the state with the new workout
        setWorkout(updatedWorkout);
    };

    const handlePublishExercise = async (exercise, exerciseIndex) => {
        console.log(exercise);
        exercise.id = workout.exercises[exerciseIndex].id;
        const updatedWorkout = new Workout({...workout});
        updatedWorkout.exercises[exerciseIndex] = exercise;

        await updateExercise(exercise);
    };

    const handleRemoveExercise = async (exerciseIndex) => {
        const updatedWorkout = new Workout({...workout});

        // Remove the week at the specified index
        if (exerciseIndex >= 0 && exerciseIndex < updatedWorkout.exercises.length) {
            updatedWorkout.exercises.splice(exerciseIndex, 1);
            await deleteExerciseFromWorkout(workout.exercises[exerciseIndex].id, updatedWorkout.id);
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
                    <CreateExerciseCard
                        onExerciseComplete={handlePublishExercise}
                        handleRemoveExercise={handleRemoveExercise}
                        index={exerciseIndex} exerciseName={exercise.name}
                        exerciseType={"weight"}>
                    </CreateExerciseCard>
                </Paper>

                ))}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CreateExerciseModal onExerciseSelect={handleSelectExercise}></CreateExerciseModal>
            </div>

        </div>
    );
};

export default CreateWorkoutPage;
