import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from './LoginScreen';
import Header from '../components/Header';
import { styles } from '../components/Style';

export default function ProfileScreen() {
  const { user, setTelaAtual } = useContext(AuthContext);

  // Se não estiver logado, joga para a tela de login automaticamente
  if (!user) {
    return <LoginScreen />;
  }

  async function deslogar() {
    try {
      await signOut(auth);
      setTelaAtual('Home'); // Volta pra Home após sair
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.conteudoInterno}>
        <Text style={styles.subtitulo}>Minha Conta</Text>
        <Text style={{ marginBottom: 20 }}>Email: {user.email}</Text>

        <View style={{ marginBottom: 12 }}>
          <Button title="Anunciar novo item" color="#4CAF50" onPress={() => setTelaAtual('NewAnnouncement')} />
        </View>
        
        <View style={{ marginBottom: 12 }}>
          <Button title="Ver meus anúncios" color="#FF9800" onPress={() => setTelaAtual('MyAnnouncements')} />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Button title="Logout" color="#F44336" onPress={deslogar} />
        </View>
      </View>
    </View>
  );
}