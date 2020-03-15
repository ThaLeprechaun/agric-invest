import request from 'supertest';
import app from '../src/app';
import { connect, disconnect } from '../scripts/mongo-setup';

beforeAll(connect);
afterAll(disconnect);

const loginCredentials = {
  email: 'scarter@gmail.com',
  password: '123abc',
};
const secret = process.env.JWT_SECRET;

describe('# Authenticate user /api/v1/auth', () => {
  test('should return an accessToken when email and password matche', async () => {
    return await request(app)
      .post('/api/v1/auth')
      .send(loginCredentials)
      .set('x-auth-token', secret)
      .expect('content-Type', /json/)
      .expect((res: any) => {
        const resValues = Object.values(res.body);
        console.log(resValues);
        const resKeys = Object.keys(res.body);
        expect(res.status).toBe(200);
        expect(resKeys).toContain('message');
        expect(resValues).toContain('Token generated');
      });
  });
});
