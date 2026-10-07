export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

export function errorHandler(error, req, res, next) {
  // Turn common database errors into messages the customer can act on.
  if (error.code === 11000) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: "Please check the submitted values." });
  }
  const statusCode = error.statusCode || error.status || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    message: statusCode >= 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong. Please try again."
      : error.message || "Something went wrong.",
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
}
