import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, Button, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import Header from '../components/Header';
import { styles } from '../components/Style';

export default function HomeScreen() {
  const [anuncios, setAnuncios] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      setCarregando(true);
      const querySnapshot = await getDocs(collection(db, "anuncios"));
      const lista = [];
      const listaEmails = new Set();

      querySnapshot.forEach((doc) => {
        const item = doc.data();
        lista.push({ id: doc.id, ...item });
        if (item.vendedor) {
          listaEmails.add(item.vendedor);
        }
      });

      setAnuncios(lista);
      setVendedores(['Todos', ...Array.from(listaEmails)]);
    } catch (error) {
      console.log("Erro ao buscar anúncios:", error);
    } finally {
      setCarregando(false);
    }
  }

  const listaFiltrada = anuncios.filter(item => {
    if (filtro === 'Todos') return true;
    return item.vendedor === filtro;
  });

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.filtroContainer}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Filtrar Vendedor:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {vendedores.map((vendedor) => (
            <TouchableOpacity 
              key={vendedor} 
              style={[styles.chip, filtro === vendedor && styles.chipAtivo]}
              onPress={() => setFiltro(vendedor)}
            >
              <Text style={filtro === vendedor ? { color: '#FFF' } : { color: '#000' }}>{vendedor}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#FF5722" />
          <Text style={{ marginTop: 10 }}>Buscando dados no Firebase...</Text>
        </View>
      ) : listaFiltrada.length === 0 ? (
        <View style={styles.centro}>
          <Text>Nenhum anúncio encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={listaFiltrada}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>
              <Text numberOfLines={3}>Descrição: {item.descricao}</Text>
              <Text style={styles.rodape}>Publicado por: {item.vendedor || 'Desconhecido'}</Text>
              
              <Button 
                title="Comprar" 
                onPress={() => alert('Compra simulada com sucesso!')} 
              />
            </View>
          )}
        />
      )}
    </View>
  );
}