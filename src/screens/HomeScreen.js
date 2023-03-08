import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, ImageBackground, TouchableOpacity, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CardComponent from '../components/CardComponent';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';

const backgroundImage = require('../assets/images/background_pattern1.png');

const HomeScreen = ({ navigation }) => {
  const { userInfo, getClaimStatus, isLoading, logout } = useContext(AuthContext);
  const [statusInfo, setStatusInfo] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);

  useEffect(() => {
    let mobile = userInfo.data.res.mobile;
    const fetchData = async () => {
      const result = await axios
        .post(`${BASE_URL}/get-claim-status`, {
          mobile
        });
      AsyncStorage.setItem('statusInfo', JSON.stringify(result.data.data[0].status));
      setStatusInfo(result.data.data[0].status);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (statusInfo != null) {
      console.log('statusInfo', statusInfo);
      const result = StatusObj.filter(obj => obj.ref === statusInfo);
      setClaimStatus(result[0].val);
      console.log(result[0].val);
    }
  }, [statusInfo])

  const StatusObj = [
    { ref: 8, val: 'Spot Survey' },
    { ref: 101, val: 'Final-Survey' },
    { ref: 102, val: 'Re-Inspection' },
    { ref: 104, val: 'Initial-Survey' },
    { ref: 9, val: 'Cancelled' }
  ];

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <CardComponent navigation={navigation} title='ACTIVE CLAIM STATUS' path='' status={claimStatus != null ? claimStatus : 'No Active Claims'} />
        <CardComponent navigation={navigation} title='Your Claims' path='Claims' status={null}/>
        {
          userInfo.userType == 'Customer' ?
          <CardComponent navigation={navigation} title='Give Consent' path='Giveconsent' status={null} />
          : ''
        }
      </View>
      <LogoutButton/>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
  },
});

export default HomeScreen;