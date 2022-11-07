const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const postLogin = catchAsync(async (req, res, next) => {
    try {
        const response = req.token

        endpointResponse({
            res,
            message: 'Post Login',
            body: response
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[User Not Found] - [index - POST]: ${error.message}`
        )
        next(httpError)
    }
})

module.exports = postLogin