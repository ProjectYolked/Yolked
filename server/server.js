const express = require('express');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();
// ... rest of your Express app setup ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
