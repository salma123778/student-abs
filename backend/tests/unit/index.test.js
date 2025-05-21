const request = require('supertest');
const app = require('../../index'); // chemin relatif vers ton index.js

describe('API Backend Tests', () => {

  it('should return success on correct login', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.username).toBe('admin');
  });

  it('should fail on wrong login', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  let studentId;

  it('should add a new student', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Alice' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice');
    studentId = res.body.id;
  });

  it('should get the list of students', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should mark attendance for a student', async () => {
    const res = await request(app)
      .post('/attendance')
      .send({ studentId, status: 'présent' });

    expect(res.statusCode).toBe(200);
    expect(res.body.attendance.name).toBe('Alice');
    expect(res.body.attendance.status).toBe('présent');
  });

  it('should return attendance history', async () => {
    const res = await request(app).get('/history');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
