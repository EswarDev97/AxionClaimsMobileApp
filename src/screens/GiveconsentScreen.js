import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, FlatList, ImageBackground, RefreshControl } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../components/LogoutButton';

const backgroundImage = require('../assets/images/background_screen.jpeg');

export default function GiveconsentScreen() {

  const { userInfo } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);
  const [consentInfo, setConsentInfo] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    // perform any necessary data fetching or refreshing operations
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let mobile = userInfo.data.res.mobile;
    const result = await axios
      .post(`${BASE_URL}/get-give-consent-list`, {
        mobile
      });
    if (result.data.data != null) {
      AsyncStorage.setItem('giveConsentInfo', JSON.stringify(result.data.data[0]));
      setConsentInfo(result.data.data[0]);
      // console.log('home claim status', result.data.data[0]);
    }
  };
  // console.log('consentInfo',consentInfo);
  const GiveConsentAgree = async () => {
    let id = consentInfo.claimsurveyUuid;
    const result = await axios
      .post(`${BASE_URL}/agree-give-consent`, {
        id
      });
    // if (result.data.data != null) {
      AsyncStorage.setItem('giveConsentAgreeInfo', JSON.stringify(result.data.data));
      // console.log('agree give consent', result.data);
      fetchData()
    // }
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.head}>Give Consent</Text>
          <View style={styles.card}>
            {
              consentInfo != null ?
                <View style={styles.content}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.label}>Report No:</Text>
                    <Text style={styles.title}>{consentInfo.reportNo}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.label}>Insured Name:</Text>
                    <Text style={styles.title}>{consentInfo.insuredName}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.label}>Claim Number:</Text>
                    <Text style={styles.title}>{consentInfo.claimNumber}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.label}>Company Name:</Text>
                    <Text numberOfLines={2} style={styles.title}>{consentInfo.companyName}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.label}>Vehical/Registration Number:</Text>
                    <Text style={styles.title}>{consentInfo.registrationNo}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.assessment}>Assessment Amout:</Text>
                    <Text style={styles.assessmentTitle}>{consentInfo.insurerTotal}</Text>
                  </View>
                  {
                    consentInfo.customer_consent != 1 ?
                      <TouchableOpacity style={styles.button} onPress={GiveConsentAgree}>
                        <Text style={styles.buttonText}>I AGREE</Text>
                      </TouchableOpacity>
                      :
                      <Text style={styles.complete}>Completed</Text>
                  }
                </View>
                :
                <View style={styles.content}>
                  <Text style={styles.subtitle}>No DATA</Text>
                </View>
            }
          </View>
        </View>

      </ScrollView>
      <LogoutButton />
    </ImageBackground>

  )

}
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
    marginTop: '10%',
  },
  welcome: {
    fontSize: 18,
  },
  head: {
    fontSize: 24,
    color: "#fff",
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    width: "90%",
  },
  content: {
    padding: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  assessment: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: "#292828"
  },
  assessmentTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    width: "60%",
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#292828',
    width: "60%",
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#0B64B1',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  complete: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
    textAlign: 'center',
    padding: 10,
    backgroundColor: "#11b859",
    borderRadius: 10,
  },
});