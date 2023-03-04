// Config logs
const LOG_LEVELS = ['error', 'warning', 'info', 'debug'];

const log = (level, message) => {
  if (LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf('info')) {
    console.log(`\n [${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}`);
  }
};

// Example usage:
// log('error', 'An error occurred');
// log('warning', 'A warning was issued');
// log('info', 'Important information');
// log('debug', 'Debug information');

module.exports = log;