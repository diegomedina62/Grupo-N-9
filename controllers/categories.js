const createHttpError = require('http-errors');
const { Categories } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');

const getCategories = catchAsync(async (req, res, next) => {
    console.log('getCategories');

    res.json('Hello!');
});

module.exports = {
    getCategories,
};
