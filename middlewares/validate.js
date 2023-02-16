"use strict";

const validateMiddleware = (req, res, next) => {
  let query = req.query.searchQuery;
  if (!query) {
    next("no search query");
  } else {
    next();
  }
};

module.exports = validateMiddleware;
