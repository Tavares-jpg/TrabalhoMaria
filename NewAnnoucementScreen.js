import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import Header from '../components/Header';

export default function NewAnnouncementScreen() {
  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  async function salvarAnuncio() {
    if (!titulo || !preco || !descricao) {
      alert('Preencha todos os campos antes de salvar!');
      return;
    }

    try {
      await addDoc(collection(db, "anuncios"), {
        titulo: titulo,
        preco: parseFloat(preco) || 0,
        descricao: descricao,
        vendedor: 'lucas@teste.com'
      });

      alert('Anuncio cadastrado com sucesso no Firebase!');
      setTitulo('');
      setPreco('');
      setDescricao('');
    } catch (error) {
      alert('Erro ao salvar no banco: ' + error.message);
    }
  }

  return (
    <View style={localStyles.container}>
      <Header />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Criar Novo Anúncio</Text>

        <Text style={{ marginBottom: 5 }}>Nome do Lanche:</Text>
        <TextInput style={localStyles.input} placeholder="Ex: X-Salada Master" value={titulo} onChangeText={setTitulo} />

        <Text style={{ marginBottom: 5 }}>Preço (R$):</Text>
        <TextInput style={localStyles.input} placeholder="Ex: 25.90" value={preco} onChangeText={setPreco} />

        <Text style={{ marginBottom: 5 }}>Descrição:</Text>
        <TextInput style={localStyles.input} placeholder="Ingredientes..." value={descricao} onChangeText={setDescricao} />

        <Button title="Salvar no Firebase" color="#FF5722" onPress={salvarAnuncio} />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  }
});