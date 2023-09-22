import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, ImageBackground, Modal, TouchableOpacity, Text, View, ScrollView, RefreshControl, Linking, BackHandler } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CardComponent from '../components/CardComponent';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';

const backgroundImage = require('../assets/images/background_screen.jpeg');

const HomeScreen = ({ navigation }) => {
  const { userInfo, getClaimStatus, isLoading, logout } = useContext(AuthContext);
  const [statusInfo, setStatusInfo] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [versionVal, setversionVal] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    fetchVersion();
    fetchData();
    setRefreshing(false);
  };

  const fetchVersion = async () => {
    const result = await axios
      .post(`${BASE_URL}/check-version`, {
        appVersion: '1.3.2',
      });
    // console.log('result version', result.data.data);
    setversionVal(result.data.data);
    if('1.3.2' < result.data.data){ setModalVisible(true); }
    else{ setModalVisible(false); }
  };

  const fetchData = async () => {
    let role = userInfo.userType[0];
    let mobile = userInfo.data.res.mobile;
    const result = await axios
      .post(`${BASE_URL}/get-claim-status`, {
        mobile,
        role
      });
    AsyncStorage.setItem('statusInfo', JSON.stringify(result.data.data));
    setStatusInfo(result.data.data);
    // console.log('home claim status', result.data.data);
  };

  // console.log("home", userInfo);

  useEffect(() => {
    fetchVersion();
    fetchData();
  }, []);

  useEffect(() => {
    if (statusInfo != null && statusInfo != 0) {
      const result = StatusObj.filter(obj => obj.ref == statusInfo.status);
      setClaimStatus(result[0].val);
      // console.log(result[0].val);
    }
  }, [statusInfo])

  const StatusObj = [
    { ref: 0, val: 'Fresh' },
    { ref: 8, val: 'Pending Documents' },
    { ref: 100, val: 'Pending for Online Survey' },
    { ref: 101, val: 'Final Survey' },
    { ref: 102, val: 'Awaiting Spare Parts' },
    { ref: 103, val: 'Inprogress' },
    { ref: 104, val: 'Pending Invoic' },
    { ref: 105, val: 'Initial Approval Given' },
    { ref: 106, val: 'Workshop Not Responding' },
    { ref: 107, val: 'Pending Assessment Approval' },
    { ref: 9, val: 'Cancelled' }
  ];

  const handleUpdatePress = () => {
    // Open the Play Store link
    Linking.openURL('https://play.google.com/store/apps/details?id=com.axionclaimsapp&pli=1');
  };

  useEffect(() => {
    const backAction = () => {
      // console.log('versionVal', versionVal);
      if('1.3.2' < versionVal){ setModalVisible(true); return true; }
      else{ return false; }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();  // Cleanup the event listener when the component is unmounted
    };
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <CardComponent navigation={navigation} title='ACTIVE CLAIM STATUS' path='Dashboard' status={claimStatus != null ? claimStatus : 'FNOL Received'} data='' />
          <CardComponent navigation={navigation} title='Your Claims' path='Claims' status={null} data='' />
          {
            userInfo.userType == 'Customer' ?
              <CardComponent navigation={navigation} title='Give Consent' path='Giveconsent' status={null} data='' />
              : ''
          }
        </View>
        <View style={styles1.container1}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles1.modalContainer}>
              <View style={styles1.modalContent}>
                <Text style={styles1.text}>The latest version of the app is now available on the Play Store.</Text>
                <TouchableOpacity
                  style={styles1.updateButton}
                  onPress={handleUpdatePress}
                >
                  <Text style={styles1.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
        <LogoutButton />
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
    marginTop: '40%',
  },
  welcome: {
    fontSize: 18,
  },
});

const styles1 = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;