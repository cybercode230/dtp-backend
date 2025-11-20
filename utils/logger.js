const fs = require('fs');
const path = require('path');

// Path to log file in root folder
const logFile = path.join(__dirname, '../server.log');

/**
 * Logs a message with timestamp to console and to server.log file
 * @param {string} message - Message to log
 * @param {'INFO' | 'ERROR' | 'WARN'} level - Log level
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;

  // Print to console
  if (level === 'ERROR') {
    console.error(logMessage);
  } else {
    console.log(logMessage);
  }

  // Append to log file
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error('Failed to write log:', err);
  });
}

module.exports = log;
