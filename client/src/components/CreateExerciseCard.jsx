import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
    Grid,
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
    Button
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import Set from "../models/Set.js";
import Exercise from "../models/Exercise.js";
import EditIcon from "@mui/icons-material/Edit";

const CreateExerciseCard = forwardRef(({ index, exerciseName, exerciseType, handleRemoveExercise, onExerciseComplete }, ref) => {
    const [sets, setSets] = useState([]);
    const [editMode, setEditMode] = useState(true);

    const addSet = () => {
        const newSet = new Set({ type: exerciseType, reps: 0, weight: 0, seconds: 0 });
        setSets([...sets, newSet]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedSets = [...sets];
        updatedSets[index][field] = value;
        setSets(updatedSets);
    };

    const handleRemoveSet = (setIndex) => {
        const updatedSets = sets.filter((_, idx) => idx !== setIndex);
        setSets(updatedSets);
    };

    const handleDone = () => {
        setEditMode(false);
        const exercise = new Exercise({name: exerciseName, sets: sets, muscleGroups: []});
        onExerciseComplete(exercise, index);
    }

    // Expose handleDone to parent component
    useImperativeHandle(ref, () => ({
        triggerDone: handleDone,
        editMode: editMode
    }));

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                    <Typography variant="h5">{index + 1}.</Typography>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'left' }}>
                    <Typography variant="h5">{exerciseName}</Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}></Grid>
                <Grid item xs={4.5} sx={{ textAlign: 'right' }}> {
                    !editMode &&
                        <IconButton onClick={() => setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                }
                </Grid>
                <Grid item xs={.5} sx={{ textAlign: 'right' }}>
                    <IconButton color="secondary" onClick={() => handleRemoveExercise(index)}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Set</TableCell>
                        <TableCell>Reps</TableCell>
                        <TableCell>Weight</TableCell>
                        {exerciseType === 'cardio' && <TableCell>Seconds</TableCell>}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sets.map((set, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={set.reps ?? undefined}
                                    disabled={!editMode}
                                    onChange={(e) => handleInputChange(idx, 'reps', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={set.weight ?? undefined}
                                    disabled={!editMode}
                                    onChange={(e) => handleInputChange(idx, 'weight', e.target.value)}
                                />
                            </TableCell>
                            {exerciseType === 'cardio' && (
                                <TableCell>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={set.seconds ?? undefined}
                                        disabled={!editMode}
                                        onChange={(e) => handleInputChange(idx, 'seconds ', e.target.value)}

                                    />
                                </TableCell>
                            )}
                            <TableCell>
                                {editMode &&
                                <IconButton onClick={() => handleRemoveSet(idx)} color="secondary">
                                    <CloseIcon />
                                </IconButton>
                                }
                            </TableCell>

                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={exerciseType === 'cardio' ? 5 : 4} style={{ textAlign: 'center' }}>
                            <Button variant="outlined" disabled={!editMode} onClick={addSet} sx={{ width: '80%' }}>
                                Add Set
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            { editMode &&
                <Button variant="contained" color="primary" onClick={handleDone}>
                Done
            </Button>
            }
        </div>
    );
});

export default CreateExerciseCard;
