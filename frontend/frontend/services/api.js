// frontend/services/api.js
import axios from 'axios';

// URL API selon environnement (à gérer via .env par exemple)
const API_BASE_URL = process.env.API_BASE_URL || 'http://192.168.100.3:3000';

export const login = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login`, credentials);
};

export const getStudents = async () => {
  return await axios.get(`${API_BASE_URL}/students`);
};

export const addStudent = async (student) => {
  return await axios.post(`${API_BASE_URL}/students`, student);
};

export const markAttendance = async (data) => {
  return await axios.post(`${API_BASE_URL}/attendance`, data);
};

export const getHistory = async () => {
  return await axios.get(`${API_BASE_URL}/history`);
};
