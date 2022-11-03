const createHttpError = require('http-errors');
const { Category } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');

const getCategories = catchAsync(async (req, res, next) => {
    try {
        const response = await Category.findAll();
        endpointResponse({
            res,
            message: 'Get categories',
            body: response,
        });
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error retrieving categories] - [index - GET]: ${error.message}`
        );
        next(httpError);
    }
});

module.exports = {
    getCategories,
};
