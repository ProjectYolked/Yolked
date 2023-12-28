import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleCreateProgram = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/api/workout-program', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const programId = response.data.id;
      navigate(`/create-program/${programId}`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  return (
      <Drawer
          variant="permanent"
          anchor="left"
          sx={{ width: 240, flexShrink: 0 }}
          PaperProps={{
            sx: { width: 170 }
          }}
      >
        <List>
          {/* Button with hover effect and spacing */}
          <ButtonBase
              component="span"
              sx={{ width: '100%', borderRadius: '4px', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
              onClick={() => navigate('/resume-workout')}
          >
            <ListItem sx={{ mb: 2 }}>
              <ListItemText primary="Resume Workout" />
            </ListItem>
          </ButtonBase>

          <Divider />

          <ButtonBase
              component="span"
              sx={{ width: '100%', borderRadius: '4px', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
              onClick={() => navigate('/create-workout')}
          >
            <ListItem sx={{ mb: 2 }}>
              <ListItemText primary="Create Workout" />
            </ListItem>
          </ButtonBase>

          <Divider />

          <ButtonBase
              component="span"
              sx={{ width: '100%', borderRadius: '4px','&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
              onClick={handleCreateProgram}
          >              <ListItem sx={{ mb: 2 }}>
              <ListItemText primary="Create Program" />
            </ListItem>
          </ButtonBase>
        </List>
      </Drawer>
  );
};

export default Sidebar;
