import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import ClaimsCardComponent from '../components/ClaimsCardComponent';

import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';

const backgroundImage = require('../assets/images/background_screen.jpeg');

const Claims = ({ navigation }) => {

  const { userInfo, statusInfo } = useContext(AuthContext);
  const [claimData, setClaimData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  let mobile = userInfo.data.res.mobile;

  const fetchData = async () => {
    const result = await axios
      .post(`${BASE_URL}/get-claims-list`, {
        mobile
      });
    AsyncStorage.setItem('ClaimsInfo', JSON.stringify(result.data));
    setClaimData(result.data);
    // console.log('result claims', result.data);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <ClaimsCardComponent claimsData={Object.keys(claimData).length != 0 ? claimData.data : null} navigation={navigation} />
      </View>
        <LogoutButton />
    </ImageBackground>
  )
}

export default Claims

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    marginRight: 15,
    marginBottom: '10%',
  },
  wrapper: {
    width: '80%',
    marginBottom: 60,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});