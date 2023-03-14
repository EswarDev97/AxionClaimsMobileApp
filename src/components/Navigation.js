import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import Claims from '../screens/Claims';
import SideMenuScreen from './SideMenuScreen';
import ClaimDetalisScreen from '../screens/ClaimDetalisScreen';
import UploadDocumentsScreen from '../screens/UploadDocumentsScreen';
import TakePhotos from '../screens/TakePhotosScreen';
import RecordVideo from '../screens/RecordVideoScreen';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo, splashLoading, logout } = useContext(AuthContext);
  console.log('navigation', userInfo.userType);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.token ? (
          <React.Fragment>
            <Stack.Screen
              name="Dashboard"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Claims"
              component={Claims}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Giveconsent"
              component={Claims}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Claimdetails"
              component={ClaimDetalisScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecordVideo"
              component={RecordVideo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakePhotos"
              component={TakePhotos}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadDocuments"
              component={UploadDocumentsScreen}
              options={{ headerShown: false }}
            />
          </React.Fragment>
          // <Stack.Screen name="Drawer" options={{headerShown: false}}>
          //   {() => (
          //   <Drawer.Navigator initialRouteName='Dashboard'>
          //     <React.Fragment>
          //       <Drawer.Screen name="Dashboard" component={HomeScreen} />
          //       <Drawer.Screen name="Claims" component={Claims} />
          //       <Drawer.Screen name="Give Consent" component={Claims} />
          //     </React.Fragment>
          //   </Drawer.Navigator>
          //   )}
          // </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;