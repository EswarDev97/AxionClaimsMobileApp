import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [statusInfo, setStatusInfo] = useState({});
  const [claimsInfo, setClaimsInfo] = useState({});

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/mobile-login-api`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        let message = res.data.message;
        console.log(userInfo);
        setUserInfo(userInfo);
        setIsLogin(true);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`check auth error ${e}`);
        setIsLoading(false);
      });
  };

  const getClaimStatus = (mobile) => {
    console.log(mobile);
    axios
      .post(`${BASE_URL}/get-claim-status`, {
        mobile
      })
      .then(res => {
        let response = res.data.data[0].status;
        console.log(response);
        setStatusInfo(response);
        AsyncStorage.setItem('statusInfo', JSON.stringify(response));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`get status error ${e}`);
      });
  };

  const getClaimList = (mobile) => {
    console.log(mobile);
      axios
        .post(`${BASE_URL}/get-claims-list`, {
          mobile
        })
        .then(res => {
          let response = res.data;
          console.log(response);
          setClaimsInfo(response);
          setResponseMessage(message);
          AsyncStorage.setItem('ClaimsInfo', JSON.stringify(response));
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`get status error ${e}`);
        });
  }

  const AuthChecking = () => {
    if (!isEmpty(userInfo)) {
      let token = userInfo.token;
      setIsLoading(true);
      
    }
  };

  const logout = () => {
    console.log('logout');
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('statusInfo');
    AsyncStorage.removeItem('ClaimsInfo');
    AsyncStorage.removeItem('SessionLinkInfo');
    setUserInfo({});
    setStatusInfo({});
    setClaimsInfo({});
    setResponseMessage('');
    setIsLogin(false)
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      logout();
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        responseMessage,
        splashLoading,
        login,
        getClaimStatus,
        getClaimList,
        logout,
        statusInfo,
        claimsInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};