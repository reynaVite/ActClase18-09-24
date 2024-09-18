import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActividades = async () => {
    try {
      const response = await fetch('http://192.168.0.104:3000/consultarActividades');
      const data = await response.json();
      setActividades(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando actividades...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={actividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>{item.descripcion}</Text>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Hora: {item.hora}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
