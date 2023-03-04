import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [statusInfo, setStatusInfo] = useState({});

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
        setResponseMessage(message);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`check auth error ${e}`);
        setIsLoading(false);
      });
  };

  const getClaimStatus = () => {
      let id = userInfo.data.res.id;
      axios
        .post(`${BASE_URL}/get-claim-status`, {
          id,
        })
        .then(res => {
          let response = res.data;
          console.log(response);
          setStatusInfo(response);
          setResponseMessage(message);
          AsyncStorage.setItem('statusInfo', JSON.stringify(response));
          setIsLoading(false);
        })
        .catch(e => {
          console.log(`get status error ${e}`);
        });
  };

  const AuthChecking = () => {
    if (!isEmpty(userInfo)) {
      let token = userInfo.token;
      setIsLoading(true);
      // axios
      //   .post(`${BASE_URL}/mobile-login-api`, {
      //     token,
      //   })
      //   .then(res => {
      //     let userInfo = res.data;
      //     let message = res.data.message;
      //     console.log(userInfo);
      //     setUserInfo(userInfo);
      //     setResponseMessage(message);
      //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      //     setIsLoading(false);
      //   })
      //   .catch(e => {
      //     console.log(`login error ${e}`);
      //     setIsLoading(false);
      //   });
    }
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setResponseMessage('');
    setIsLoading(false);

    // axios
    //   .post(
    //     `${BASE_URL}/logout`,
    //     {},
    //     {
    //       headers: {Authorization: `Bearer ${userInfo.access_token}`},
    //     },
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     AsyncStorage.removeItem('userInfo');
    //     setUserInfo({});
    //     setIsLoading(false);
    //   })
    //   .catch(e => {
    //     console.log(`logout error ${e}`);
    //     setIsLoading(false);
    //   });
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
        logout,
        statusInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};