import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardComponent = ({ status }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>User Status</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
  },
});

export default CardComponent;