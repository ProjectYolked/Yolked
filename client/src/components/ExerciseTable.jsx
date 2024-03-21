import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import workout from "../models/Workout.js";

const ExerciseTable = ({ workout, extendedView }) => {
    const cellStyle = {
        paddingTop: '4px',
        paddingBottom: '4px',
        border: '0'
    }
    return(
        <>
            <Typography variant="h6" component="h2" textAlign={"center"}>
                {workout.name}
            </Typography>
            <Table aria-label="exercise preview table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ color: 'lightgray' }}>Exercise</TableCell>
                        <TableCell align="center" style={{ color: 'lightgray' }}>Sets</TableCell>
                        <TableCell align="center" style={{ color: 'lightgray' }}>Reps/Minutes</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {workout.exercises.map((exercise, index) => (
                        <>
                            <TableRow sx={{height: '1px'}}>
                                <TableCell align="left" sx={{...cellStyle, fontWeight:'bold', paddingTop: '16px'}}>
                                    {exercise.name}
                                </TableCell>
                                {extendedView && (
                                    <TableCell align="center" sx={{...cellStyle, paddingTop: '16px'}}>
                                        {String(exercise.sets.length)}
                                    </TableCell>
                                )}
                                {extendedView && (
                                    <TableCell align="center" sx={{...cellStyle, paddingTop: '16px'}}>
                                        {exercise.getRepRange()}
                                    </TableCell>
                                )}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default ExerciseTable
