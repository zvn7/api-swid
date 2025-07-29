const errorHandler = (err, req, res, next) => {
    console.error("[ERROR]", err.stack || err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Terjadi kesalahan pada server.";

    res.status(statusCode).json({
        success: false,
        code: statusCode,
        message,
        stack: process.env.NODE_ENV === "production" ? "🧯" : err.stack,
    });
};

module.exports = errorHandler;
