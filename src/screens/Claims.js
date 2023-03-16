import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import ClaimsCardComponent from '../components/ClaimsCardComponent';

import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';
import CardComponent from '../components/CardComponent';

const backgroundImage = require('../assets/images/background_screen.jpeg');

const Claims = ({ navigation }) => {

  const { userInfo, statusInfo } = useContext(AuthContext);
  const [claimData, setClaimData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  let role = userInfo.userType[0];
  // console.log('claims', role);

  let mobile = userInfo.data.res.mobile;
  // console.log('userInfo.data', userType);

  const fetchData = async () => {
    const result = await axios
      .post(`${BASE_URL}/get-claims-list`, {
        mobile,
        role
      });
    AsyncStorage.setItem('ClaimsInfo', JSON.stringify(result.data));
    setClaimData(result.data);
    // console.log('result claims', result.data);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {Object.keys(claimData).length != 0 ?
          <ClaimsCardComponent claimsData={claimData.data} navigation={navigation} />
          :
          <Text style={styles.data}>Data Fetching</Text>
        }
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
  data:{
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: "#ebebeb",
    padding: 40,
    width: "90%",
    marginLeft: 20,
    borderRadius: 15,
  },
  link: {
    color: 'blue',
  },
});