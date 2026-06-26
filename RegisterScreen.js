import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import Header from '../components/Header';
import { styles } from '../components/Style';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function criarConta() {
    if (!email || !senha) {
      alert('Preencha os campos para cadastrar.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert('Conta cadastrada com sucesso na nuvem!');
      setEmail('');
      setSenha('');
    } catch (error) {
      alert('Erro no Cadastro: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.conteudoInterno}>
        <Text style={styles.subtitulo}>Criar Nova Conta</Text>
        <Text>Email:</Text>
        <TextInput style={styles.input} placeholder="exemplo@tads.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text>Senha:</Text>
        <TextInput style={styles.input} placeholder="Crie uma senha" secureTextEntry value={senha} onChangeText={setSenha} />
        <Button title="Cadastrar Conta" color="#4CAF50" onPress={criarConta} />
      </View>
    </View>
  );
}