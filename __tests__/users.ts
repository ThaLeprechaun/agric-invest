import request from 'supertest';
import app from '../src/app';
import { connect, disconnect } from '../scripts/mongo-setup';
// var envPath = __dirname + "../.env";
// import jwt from 'jsonwebtoken';
require('dotenv').config();
process.env = JSON.parse(JSON.stringify(process.env));

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

const loginCredentials = {
  email: 'scarter@gmail.com',
  password: '123abc',
};
const loginCredentialsWithInvalidEmail = {
  email: 'cshawn@gmail.com',
  password: '123abc',
};
const loginCredentialsWithBadPass = {
  email: 'scarter@gmail.com',
  password: '123xyz',
};
// const admin = {
//   email: 'eoraka@gmail.com',
//   password: '123abc'
// }
const secret = 'thesecret';
// const token = secret;
// const verified: any = jwt.verify(token, secret);

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
        expect(resKeys).toContain('msg');
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
        expect(res.status).toBe(500);
        expect(resKeys).toContain('error');
        expect(resValues).toContain('Email already exists');
      });
  });
  test('should report error with message - "Phone number already exists or Invalid phone number", when phone Number already exists', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(dataWithSamePhone)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        const resKeys = Object.keys(res.body);
        const resValues = Object.values(res.body);
        expect(res.status).toBe(500);
        expect(resKeys).toContain('error');
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
  // test('should return all registered users', async () => {
  //   return await request(app)
  //     .get('/api/v1/users')
  //     .send(admin)
  //     .set('x-auth-token', verified)
  //     .expect('content-Type', /json/)
  //     .expect((res: any) => {
  //       // const resValues = Object.values(res.body);
  //       // const resKeys = Object.keys(res.body);
  //       expect(res.status).toBe(200);
  //       // expect(resKeys).toContain('message');
  //       // expect(resValues).toContain('Users Retrieved Successfully');
  //     });
  // });
});

describe('# Authenticate user /api/v1/auth', () => {
  test('should return an accessToken when email and password matches', async () => {
    return await request(app)
      .post('/api/v1/auth')
      .send(loginCredentials)
      .set('x-auth-token', secret)
      .expect('content-Type', /json/)
      .expect((res: any) => {
        const resValues = Object.values(res.body);
        const resKeys = Object.keys(res.body);
        expect(res.status).toBe(200);
        expect(resKeys).toContain('message');
        expect(resValues).toContain('Token generated');
      });
  });
  test('should report error with message-"Invalid credentials. Unable to get user email" when email does not match ', async () => {
    return await request(app)
      .post('/api/v1/auth')
      .send(loginCredentialsWithInvalidEmail)
      .set('x-auth-token', secret)
      .expect('content-Type', /json/)
      .expect((res: any) => {
        const resValues = Object.values(res.body);
        const resKeys = Object.keys(res.body);
        expect(res.status).toBe(400);
        expect(resKeys).toContain('message');
        expect(resValues).toContain(
          'Invalid credentials. Unable to get user email',
        );
      });
  });
  test('should report error with message-"Invalid credentials. Password do not match" when email does not match ', async () => {
    return await request(app)
      .post('/api/v1/auth')
      .send(loginCredentialsWithBadPass)
      .set('x-auth-token', secret)
      .expect('content-Type', /json/)
      .expect((res: any) => {
        const resValues = Object.values(res.body);
        const resKeys = Object.keys(res.body);
        expect(res.status).toBe(400);
        expect(resKeys).toContain('message');
        expect(resValues).toContain(
          'Invalid credentials. Password do not match',
        );
      });
  });
  // test('should return user details ', async () => {
  //   return await request(app)
  //     .get('/api/v1/auth')
  //     .set('x-auth-token', secret)
  //     .expect('content-Type', /json/)
  //     .expect((res: any) => {
  //       const resKeys = Object.keys(res.body);
  //       const resValues = Object.values(res.body);
  //       expect(res.status).toBe(200);
  //       expect(resKeys).toContain(loginCredentials);
  //       expect(resValues).toContain(
  //         'Invalid credentials. Password do not match',
  //       );
  //     });
  // });
});
