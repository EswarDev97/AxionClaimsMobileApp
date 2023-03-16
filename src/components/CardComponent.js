import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const CardComponent = ({ title, status, navigation, path, data }) => {
  const navigateToScreen = (screenName, params) => {
    if(status === 'openWeb')
    {
      Linking.openURL(path);
    }
    navigation.navigate(screenName, params);
};
  return (
    <TouchableOpacity style={{width: '90%'}} onPress={() => navigateToScreen(path, { data })}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {status != null && status != 'openWeb'? (<Text style={styles.status}>{status}</Text>) : ''}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B64B1',
    borderRadius: 10,
    padding: 30,
    marginLeft: 10,
    marginBottom: 20,
    width: '95%',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  status: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
  },
});

export default CardComponent;