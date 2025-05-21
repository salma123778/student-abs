require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [
  { username: 'admin', password: '1234' }
];

let students = [];
let history = [];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, username });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants invalides' });
  }
});

app.post('/students', (req, res) => {
  const { name } = req.body;
  const newStudent = {
    id: Date.now(),
    name
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/attendance', (req, res) => {
  const { studentId, status } = req.body;
  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: 'Étudiant non trouvé' });
  }

  const attendance = {
    name: student.name,
    status,
    date: new Date().toLocaleString()
  };
  history.push(attendance);
  res.status(200).json({ message: 'Présence enregistrée', attendance });
});

app.get('/history', (req, res) => {
  res.json(history);
});

// Exporter app pour les tests
module.exports = app;

// Lancer le serveur seulement si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend API démarrée sur http://192.168.8.101:${PORT}`);
  });
}
