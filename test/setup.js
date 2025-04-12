const { createServer } = require('../app');
const fs = require('fs');
const path = require('path');

// Verify index.html exists before tests run
beforeAll(() => {
  const htmlPath = path.join(__dirname, '../index.html');
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`index.html not found at ${htmlPath}`);
  }
});

// Global test utilities
global.createTestServer = (color = null) => {
  if (color) process.env.COLOR = color;
  const { app, logStream } = createServer();
  const server = app.listen(0); // Random available port
  
  return {
    app,
    server,
    logStream,
    getLogs: () => {
      const logPath = path.join(__dirname, '../logs/app.log');
      return fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : '';
    }
  };
};