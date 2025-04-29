const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

function createServer() {
  const app = express();
  const colorEnv = process.env.COLOR;
  const backgroundColor = colorEnv || 'blue'; // Default to blue if not set
  const logsDir = path.join(__dirname, 'logs');

  // Ensure logs directory exists
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const logFilePath = path.join(logsDir, 'app.log');
  const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] ${message}`;
    console.log(formatted);
    logStream.write(formatted + '\n');
  };

  // App startup logs
  logMessage('🚀 Starting Color Display Application...');
  logMessage(`🌐 Hostname: ${os.hostname()}`);
  logMessage(`🎨 Color set to: ${backgroundColor}`);
  logMessage(`📁 Serving HTML from: ${path.join(__dirname, 'index.html')}`);
  logMessage(`📄 Logging to file: ${logFilePath}`);

  // Route
  app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
    const method = req.method;
    const url = req.originalUrl;
    logMessage(`📥 Request: ${method} ${url} | IP: ${ip} | UA: ${userAgent}`);

    const htmlPath = path.join(__dirname, 'index.html');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        const errorMsg = `❌ Error reading ${htmlPath}: ${err.message}`;
        logMessage(errorMsg);
        return res.status(500).send(errorMsg);
      }
      const output = data.replace(/{{COLOR}}/g, backgroundColor);
      res.send(output);
    });
  });

  return { app, logStream };
}

module.exports = { createServer };

// Run server if executed directly
if (require.main === module) {
  const { app } = createServer();
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('🛑 Server terminated gracefully');
    });
  });
}
