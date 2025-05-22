import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.8.101:3000/login', {
        username,
        password
      });
      if (res.data.success) {
        navigation.navigate('Students');
      } else {
        alert('Login échoué');
      }
    } catch (err) {
      console.log(err);
      alert('Erreur lors de la connexion');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nom d'utilisateur" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 }
});
