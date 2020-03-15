import request from 'supertest';
import app from '../src/app';
import { connect, disconnect } from '../scripts/mongo-setup';

beforeAll(connect);
afterAll(disconnect);

const data = {
  firstName: 'Shawn',
  lastName: 'Carter',
  phone: '08012345678',
  email: 'scarter@gmail.com',
  password: '123abc',
  userCategory: 'investor',
};
const dataWithSameEmail = {
  firstName: 'Fela',
  lastName: 'Kuti',
  phone: '08012345679',
  email: 'scarter@gmail.com',
  password: '123abc',
  userCategory: 'investor',
};
const dataWithSamePhone = {
  firstName: 'Sugar',
  lastName: 'Ray',
  phone: '08012345678',
  email: 'sray@gmail.com',
  password: '123abc',
  userCategory: 'investor',
};
const emptyData = {};

describe('Server', () => {
  test('Has a /api endpoint', async () => {
    return await request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, { message: { hello: 'Hello World' } });
  });
});
describe('# POST /api/v1/users', () => {
  test('should create a new user', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        const resKeys = Object.keys(res.body);
        const resValues = Object.values(res.body);
        expect(res.status).toBe(201);
        expect(resKeys).toContain('message');
        expect(resValues).toContain('User created successfully');
      });
  });
  test('should report error with message - "Email already exists", when email already exists', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(dataWithSameEmail)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        const resKeys = Object.keys(res.body);
        const resValues = Object.values(res.body);
        expect(res.status).toBe(400);
        expect(resKeys).toContain('message');
        expect(resValues).toContain('Email already exists');
      });
  });
  test('should report error with message - "Phone number already exists or Invalid phone number", when email already exists', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(dataWithSamePhone)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        const resKeys = Object.keys(res.body);
        const resValues = Object.values(res.body);
        expect(res.status).toBe(400);
        expect(resKeys).toContain('message');
        expect(resValues).toContain(
          'Phone number already exists or Invalid phone number',
        );
      });
  });
  test('should report error with message - "Please provide valid parameters", when any required field is empty', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(emptyData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        const resKeys = Object.keys(res.body);
        const resValues = Object.values(res.body);
        expect(res.status).toBe(400);
        expect(resKeys).toContain('message');
        expect(resValues).toContain('Please provide valid parameters');
      });
  });
});
