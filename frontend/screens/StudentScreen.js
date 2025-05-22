import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.8.101:3000'; // ← remplace par ton IP locale si besoin

export default function StudentsScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.log('Erreur chargement étudiants:', error);
    }
  };

  const addStudent = async () => {
    if (!newStudent) return;
    try {
      await axios.post(`${API_BASE_URL}/students`, { name: newStudent });
      setNewStudent('');
      fetchStudents();
    } catch (error) {
      console.log('Erreur ajout étudiant:', error);
    }
  };

  const markAttendance = async (studentId, status) => {
    try {
      await axios.post(`${API_BASE_URL}/attendance`, {
  studentId: Number(studentId),
  status
});
      alert(`Présence enregistrée : ${status}`);
    } catch (error) {
      console.log('Erreur présence:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Étudiants</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Nom de l'étudiant"
          value={newStudent}
          onChangeText={setNewStudent}
        />
        <Button title="Ajouter" onPress={addStudent} />
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.presentBtn}
                onPress={() => markAttendance(item.id, 'Présent')}
              >
                <Text style={styles.btnText}>✅</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.absentBtn}
                onPress={() => markAttendance(item.id, 'Absent')}
              >
                <Text style={styles.btnText}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button title="Voir l'historique" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 10, borderRadius: 5 },
  studentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  buttons: { flexDirection: 'row', gap: 10 },
  presentBtn: { backgroundColor: '#b8e994', padding: 10, borderRadius: 5 },
  absentBtn: { backgroundColor: '#f8d7da', padding: 10, borderRadius: 5 },
  btnText: { fontSize: 16 }
});
