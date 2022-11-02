const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

// example of a controller. First call the service, then build the controller method

const getUser = catchAsync(async (req, res, next) => {
  try {
    const response = await User.findAll();
    endpointResponse({
      res,
      message: "All users",
      body: response,
    });
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving users] - [index - GET]: ${error.message}`
    );
    next(httpError);
  }
});

module.exports = { getUser };

