"use strict";

const error404 = (req, res, next) => {
  res.status(404).json({
    code: 404,
    route: req.path,
    message: `Page not found`,
  });
};

// function error404(request, response) {
//   response.status(404).send("not found");
// }

module.exports = error404;
