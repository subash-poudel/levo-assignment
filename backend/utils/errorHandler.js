function errorHandlerMiddleware(err, req, res, next) {
  const error = buildError(err);

  res.status(error.code).json({ error });
}

function buildError(err) {
//   console.log(err);
    console.log('build error is called');
  if (err.isJoi) {
    return {
      code: 400,
      message: "Validation error",
      details:
        err.details &&
        err.details.map((err) => {
          return {
            message: err.message,
            param: err.path.join("."),
          };
        }),
    };
  }

  return {
    code: 500,
    message: "Something went wrong on the server.",
  };
}

module.exports = errorHandlerMiddleware