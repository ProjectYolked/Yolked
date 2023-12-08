const express = require('express');
const workoutProgramRoutes = require('./api/routes/workoutProgramRoutes');
const workoutRoutes = require('./api/routes/workoutRoutes');
const userRoutes = require('./api/routes/workoutRoutes');
const connectDB = require('./config/db');

// Connect to Database
await connectDB();

const app = express();
app.use('/api', userRoutes);
app.use('/api', workoutProgramRoutes);
app.use('/api', workoutRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
