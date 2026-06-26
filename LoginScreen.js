import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import Header from '../components/Header';
import { styles } from '../components/Style';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin() {
    if (!email || !senha) {
      alert('Preencha e-mail e senha.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert('Login efetuado com sucesso! Agora seus anúncios serão criados com o seu e-mail.');
    } catch (error) {
      alert('Erro no Login: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.conteudoInterno}>
        <Text style={styles.subtitulo}>Acessar Conta</Text>
        <Text>Email:</Text>
        <TextInput style={styles.input} placeholder="seuemail@tads.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text>Senha:</Text>
        <TextInput style={styles.input} placeholder="Sua senha" secureTextEntry value={senha} onChangeText={setSenha} />
        <Button title="Entrar" color="#FF5722" onPress={fazerLogin} />
      </View>
    </View>
  );
}