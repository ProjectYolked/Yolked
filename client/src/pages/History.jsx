import * as React from 'react';
import dayjs from 'dayjs';
import { Grid, Typography } from "@mui/material";
import BackButton from "../components/BackButton";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const History = () => {

    const [day, setDay] = React.useState(dayjs());

    return (
        <div style={{ padding: 20, height: "100%", alignSelf: "flex-start" }}>
            <Grid container spacing={0}>
                <Grid item xs={.5}>
                    <BackButton to={`/`}></BackButton>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h4" gutterBottom>
                        History
                    </Typography>
                </Grid>
            </Grid>

            <Grid container>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12}>
                        <DateCalendar
                            openTo='day'
                            views={['day', 'month', 'year']}
                            value={day}
                            onChange={(newday) => setDay(newday)}
                        />
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </div>
    )
}

export default History;