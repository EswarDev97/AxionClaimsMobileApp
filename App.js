import React from "react";
import { Text, View } from "react-native";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { NativeBaseProvider } from 'native-base';


const App = () => {
    return(
        <AuthProvider>
            <NativeBaseProvider>
                <Navigation/>
            </NativeBaseProvider>
        </AuthProvider>
    )
}

export default App