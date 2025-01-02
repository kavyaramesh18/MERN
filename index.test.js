// backend/test/index.test.js
const request = require('supertest');
const app = require('../index'); // Assuming your main app is in index.js
const mongoose = require('mongoose');
const UserModel = require('../model/userModel'); // Adjust path if needed

// Connect to an in-memory database before running tests
beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/testDB'; // In-memory DB for testing
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear database after each test to ensure tests are independent
afterEach(async () => {
  await UserModel.deleteMany(); // Clear users from DB
});

// Disconnect after tests are finished
afterAll(async () => {
  await mongoose.disconnect();
});

describe('POST /signup', () => {
  it('should create a new user and return user data', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const response = await request(app).post('/signup').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', newUser.name);
    expect(response.body).toHaveProperty('email', newUser.email);
    expect(response.body).not.toHaveProperty('password'); // Password should not be returned
  });

  it('should return an error if the email already exists', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    // First request to create the user
    await request(app).post('/signup').send(newUser);

    // Second request with the same email should return an error
    const response = await request(app).post('/signup').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email already exist');
  });

  it('should return an error if required fields are missing', async () => {
    const response = await request(app).post('/signup').send({});

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
