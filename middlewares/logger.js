"use strict";

const loggerMiddleware = (req, res, next) => {
  console.log(`Logged at ${new Date()} with ${req.method}`);

  next();
};

module.exports = loggerMiddleware;
