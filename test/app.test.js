const request = require('supertest');
const { createServer } = require('../app');
const fs = require('fs');
const path = require('path');

describe('Color Display Application', () => {
  let testServer;

  beforeAll(() => {
    // Verify index.html exists before tests run
    const htmlPath = path.join(__dirname, '../index.html');
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`index.html not found at ${htmlPath}`);
    }
  });

  beforeEach(() => {
    // Set up a new server instance before each test
    testServer = createTestServer();
  });

  afterEach(async () => {
    // Cleanup after each test
    if (testServer && testServer.logStream) {
      testServer.logStream.end();
    }
    if (testServer && testServer.server) {
      await new Promise(resolve => testServer.server.close(resolve));
    }
    delete process.env.COLOR;
  });

  describe('Server Configuration', () => {
    test('should use default color (blue) when COLOR env is not set', async () => {
      const response = await request(testServer.app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('background-color: blue');
    }, 10000);

    test('should use environment variable COLOR when set', async () => {
      process.env.COLOR = 'purple'; // Set the environment variable
      const response = await request(testServer.app).get('/');
      expect(response.text).toContain('background-color: purple');
    }, 10000);

    test('should include company information', async () => {
      const response = await request(testServer.app).get('/');
      expect(response.text).toContain('Hilltop Consultancy');
      expect(response.text).toContain('+45 7157 3047');
    }, 10000);

    test('should log requests', async () => {
      await request(testServer.app)
        .get('/')
        .set('User-Agent', 'TestAgent/1.0');

      const logPath = path.join(__dirname, '../logs/app.log');
      const logs = fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : '';
      expect(logs).toContain('New Request');
      expect(logs).toContain('TestAgent/1.0');
    }, 10000);
  });
});

// Global test utilities
const createTestServer = () => {
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

module.exports = createTestServer;
