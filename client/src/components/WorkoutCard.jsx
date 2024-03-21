import React from 'react';
import {Box, IconButton, Paper, Typography} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline.js";
import ExerciseTable from "./ExerciseTable.jsx";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";

const WorkoutCard = ({workout, day, weekIndex, editCallback, deleteCallback}) =>{
    return(
        <Paper style={{ minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'top', justifyContent: 'flex-start' }}>

            {workout === undefined
                ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
                        <IconButton color="primary" onClick={() => editCallback(weekIndex, day)}>
                            <AddCircleOutlineIcon fontSize="large" />
                        </IconButton>
                    </Box>
                )
                : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton color="secondary" onClick={() => deleteCallback(workout.id, weekIndex, day,)}>
                                <RemoveCircleOutlineIcon fontSize="medium" />
                            </IconButton>
                            <IconButton color="primary" onClick={() => editCallback(weekIndex, day, workout)}>
                                <EditIcon fontSize="medium" />
                            </IconButton>
                        </div>
                        <ExerciseTable workout={workout} extendedView={true}></ExerciseTable>
                    </>
                )
            }
        </Paper>
    )
}
export default WorkoutCard