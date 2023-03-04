import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CardComponent from '../components/CardComponent';
import {AuthContext} from '../context/AuthContext';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from '@ui-kitten/components';
import Content from './Content';


const HomeScreen = () => {
  const {userInfo, statusInfo, getClaimStatus, isLoading, logout} = useContext(AuthContext);

  useEffect(() => {
    getClaimStatus();
  }, []);

  let StatusData = statusInfo;
  const userStatus = 'Active';
  const styles = useStyleSheet(themedStyles);
  console.log(StatusData);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <CardComponent status={userStatus} />
      {/* <CardComponent status={StatusData} /> */}
      <Text style={styles.welcome}>Welcome {userInfo.data.res.firstName+' '+userInfo.data.res.lastName}</Text>
      <Text style={styles.welcome}>{userInfo.data.res.email}</Text>
      <Text style={styles.welcome}>UserType : {userInfo.userType}</Text>
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   welcome: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
// });

export default HomeScreen;
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  layout: {
    height: '47%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 32,
  },
  crown: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: 'text-white-color',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icCrown: {
    width: 16,
    height: 16,
  },
  buttonUpgrade: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingRight: 16,
    marginHorizontal: 24,
  },
  titColor: {
    tintColor: 'text-white-color',
  },
  icon: {
    borderRadius: 16,
    padding: 12,
    margin: 10,
  },
  itemText: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 24,
  },
});
const DATA_Profile01 = [
  {
    id: 0,
    icon: '',
    title: 'Goal Settings',
    color: '#4B9BAE',
  },
  {
    id: 1,
    icon: '',
    title: 'Language',
    color: '#949398',
  },
  {
    id: 2,
    icon: '',
    title: 'Darkmode',
    color: '#215190',
  },
  {
    id: 3,
    icon: '',
    title: 'Sync Account',
    color: '#C06363',
  },
];