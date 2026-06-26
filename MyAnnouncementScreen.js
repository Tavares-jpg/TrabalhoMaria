import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import { styles } from '../components/Style';

export default function MyAnnouncementScreen() {
  const { user } = useContext(AuthContext);
  const [meusAnuncios, setMeusAnuncios] = useState([]);

  useEffect(() => {
    async function buscarMeusAnuncios() {
      try {
        const q = query(collection(db, 'anuncios'), where('usuarioEmail', '==', user.email));
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach((doc) => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setMeusAnuncios(lista);
      } catch (error) {
        console.log(error);
      }
    }
    buscarMeusAnuncios();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={[styles.subtitulo, { margin: 15 }]}>Meus Anúncios Cadastrados</Text>
      
      {meusAnuncios.length === 0 ? (
        <View style={styles.centro}><Text>Você não tem anúncios ainda.</Text></View>
      ) : (
        <FlatList
          data={meusAnuncios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
              <Text>Descrição: {item.descricao}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}