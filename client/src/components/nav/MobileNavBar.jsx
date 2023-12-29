import { useState } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MobileNavBar = () => {
    const [value, setValue] = useState();
    return (
        <Box sx={{ width: '100vw', position: 'fixed', bottom: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Create Workout" icon={<FitnessCenterIcon />} />
                <BottomNavigationAction label="Create Program" icon={<EventRepeatIcon />} />
                <BottomNavigationAction label="History" icon={<CalendarMonthIcon />} />
                <BottomNavigationAction label="Browse Programs" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box>
    );
}

export default MobileNavBar;