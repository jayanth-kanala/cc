#!/usr/bin/env node

import app from '../src/app.js';  // Import your Express app
import debug from 'debug';     // For debugging
import http from 'http';

// Set the debug logger
const debugLog = debug('myapp:server');

// Normalize a port into a number, string, or false
const normalizePort = (val: string): number | string | boolean => {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val; // Named pipe
    if (port >= 0) return port;   // Port number
    return false;
};

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event
function onListening(): void {
    const addr = server.address();
    if (addr === null) {
        debugLog('Server is not listening'); // Handle the case where addr is null
        return;
    }
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debugLog('Listening on ' + bind);
}
