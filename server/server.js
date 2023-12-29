const cors = require('cors');
const express = require('express');
const workoutProgramRoutes = require('./api/routes/workoutProgramRoutes');
const workoutRoutes = require('./api/routes/workoutRoutes');
const userRoutes = require('./api/routes/userRoutes');
const exerciseRoutes = require('./api/routes/exerciseRoutes')
const connectDB = require('./config/db');
const logger = require('./config/logger');

// Connect to Database
const startServer = async () => {
    try {
        await connectDB();
        logger.info('Database connected successfully');

        const app = express();
        app.use(cors());

        // Use Morgan for HTTP request logging
        // Found normal use annoying
        //app.use(morgan('combined'));

        app.use(express.json()); // Needed to parse JSON bodies

        app.use('/api', userRoutes);
        app.use('/api', workoutProgramRoutes);
        app.use('/api', workoutRoutes);
        app.use('/api', exerciseRoutes)

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    } catch (error) {
        logger.error('Database connection failed', error);
        process.exit(1); // Exit with failure
    }
};

startServer();
