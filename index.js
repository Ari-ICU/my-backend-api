const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 4000;
const server = express();

// Connect to Database
connectDB();

server.use(morgan('dev'))
server.use(express.json());

const apiRoutes = require('./src/routes');
const AppError = require('./src/exceptions/appError');
const errorHandler = require('./src/exceptions/errorHandler');
const setupSwagger = require('./src/config/swagger');

// Mount Swagger Documentation
setupSwagger(server);

server.use('/api/v1', apiRoutes);

server.get('/', (req, res) => {
    res.json({
        message: "Welcome to E-Commerce API!",
        docs: `http://localhost:${PORT}/api-docs`,
        version: "1.0.0",
        status: "healthy"
    });
});

// Handle undefined routes
server.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler Middleware
server.use(errorHandler);

server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});