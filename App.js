import React ,{ useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { NativeBaseProvider } from 'native-base';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import axios from 'axios';
import { BASE_URL } from './src/config';

const App = () => {
    return (
        <AuthProvider>
            <ApplicationProvider
                {...eva} theme={eva.light}>

                <NativeBaseProvider>
                    <Navigation />
                </NativeBaseProvider>
            </ApplicationProvider>
        </AuthProvider>
    )
}

export default App