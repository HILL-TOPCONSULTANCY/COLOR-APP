const request = require('supertest');

describe('Color Display Application', () => {
  let testServer;

  afterEach(async () => {
    // Cleanup after each test
    if (testServer) {
      testServer.logStream.end();
      await new Promise(resolve => testServer.server.close(resolve));
    }
    delete process.env.COLOR;
  });

  describe('Server Configuration', () => {
    test('should use default color (red) when COLOR env is not set', async () => {
      testServer = global.createTestServer();
      const response = await request(testServer.app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('background-color: red');
    }, 10000); // Increased timeout
  });

  test('should use environment variable COLOR when set', async () => {
    testServer = global.createTestServer('purple');
    const response = await request(testServer.app).get('/');
    expect(response.text).toContain('background-color: purple');
  }, 10000);

  test('should include company information', async () => {
    testServer = global.createTestServer();
    const response = await request(testServer.app).get('/');
    expect(response.text).toContain('Hilltop Consultancy');
    expect(response.text).toContain('+45 7157 3047');
  }, 10000);

  test('should log requests', async () => {
    testServer = global.createTestServer();
    await request(testServer.app)
      .get('/')
      .set('User-Agent', 'TestAgent/1.0');
    
    const logs = testServer.getLogs();
    expect(logs).toContain('New Request');
    expect(logs).toContain('TestAgent/1.0');
  }, 10000);
});