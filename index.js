const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./src/config/database');
const corsOptions = require('./src/middlewares/cors');

const PORT = process.env.PORT || 4000;
const server = express();

// Connect to Database
connectDB();

server.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
server.use(cors(corsOptions));
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve static uploads and files
server.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
server.use(express.static(__dirname));


const apiRoutes = require('./src/routes');
const AppError = require('./src/exceptions/appError');
const errorHandler = require('./src/exceptions/errorHandler');
const setupSwagger = require('./src/config/swagger');
const { globalLimiter } = require('./src/middlewares/rate-limiting');

server.use(globalLimiter)

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