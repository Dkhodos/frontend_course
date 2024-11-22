// server.mjs

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();
const PORT = 3000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure the logger
const logger = winston.createLogger({
  level: 'info', // Log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, meta }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

// Use express-winston middleware for request logging
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    expressFormat: false,
    colorize: false,
  })
);

// Serve static files from root and 'public' directory
app.use(express.static(path.join(__dirname, '.')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route to handle all other requests and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error logging middleware (optional)
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
