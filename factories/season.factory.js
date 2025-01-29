// season.factory.js
const { Season } = require('../models/season');

class SeasonFactory {
    static create({ name, startDate, endDate }) {
        return Season.build({ name, startDate, endDate });
    }
}

module.exports = SeasonFactory;