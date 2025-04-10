const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err.stack || err.message);
    console.error("Request Method:", req.method);
    console.error("Request URL:", req.originalUrl);
    console.error("Request Body:", req.body); // Log request body for better debugging

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Server Error",
      error: process.env.NODE_ENV === "production" ? null : err, // Hide error details in production
    });
};

export default errorHandler;
