import React, { useContext, useState } from 'react';
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import DeviceInfo from "react-native-device-info";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { isLoading, login, responseMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image  source={require('./../assets/images/axion_logo.png')} style={{width: 144, height: 144, marginBottom: 25}} />  
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000', marginBottom: 25}}>AXION CLAIMS</Text>
            {/* <Text>{DeviceInfo.getSystemVersion()}</Text> */}
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter email"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Button
                    title="Login"
                    onPress={() => {
                        login(email, password);
                    }}
                    color="#11cf20"
                />

                <View style={{ flexDirection: 'row', marginTop: 20, color: 'green' }}>
                    {/* <Text style={{color: 'red'}}>{'Please Enter the correct details/'+' '+responseMessage}</Text> */}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    link: {
        color: 'blue',
    },
});

export default LoginScreen;