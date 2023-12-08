const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Yolkked:pass@cluster0.9zxajrj.mongodb.net/");
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log("Error connecting to MongoDB")
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
