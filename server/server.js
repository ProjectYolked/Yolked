const cors = require('cors');
const express = require('express');
const workoutProgramRoutes = require('./api/routes/workoutProgramRoutes');
const workoutRoutes = require('./api/routes/workoutRoutes');
const userRoutes = require('./api/routes/userRoutes'); // Corrected import
const connectDB = require('./config/db');

// Connect to Database
const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');

        const app = express();
        app.use(cors());

        app.use(express.json()); // Needed to parse JSON bodies

        app.use('/api', userRoutes);
        app.use('/api', workoutProgramRoutes);
        app.use('/api', workoutRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1); // Exit with failure
    }
};

startServer();
