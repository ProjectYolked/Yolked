const logger = require("../../config/logger");

const validateMonthQueryParam = (req, res, next) => {

    const value = req.query.month;

    // Check if the value is a number and within the valid range
    if(value !== undefined && (typeof value !== 'string' || !value.match(/^(0?[1-9]|1[0-2])$/)) ){
        logger.error(`Bad query param request for months for user with id ${req.user.id}`)
        return res.status(400).json({ message: 'Bad query param request for months' });
    }
    next();
}

const validateYearQueryParam = (req, res, next) => {
    const value = req.query.year;
    logger.info("hello2");
    // Match years from 2000 to 2100
    const regex = /^(20[0-9]{2}|2100)$/;
    // Check if the value is a number and within the valid range
    if(value !== undefined && (typeof value !== 'string' || !regex.test(value))){
        logger.error(`Bad query param request for years for user with id ${req.user.id}`)
        return res.status(400).json({ message: 'Bad query param request for years' });
    }
    next();
}

// Export an object with multiple properties
module.exports = {
    validateMonthQueryParam,
    validateYearQueryParam
};