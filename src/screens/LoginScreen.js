import React, { useContext, useState, useEffect } from 'react';
import {
    Button,
    Text,
    TextInput,
    ImageBackground,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import DeviceInfo from "react-native-device-info";

const backgroundImage = require('../assets/images/background_car.jpg');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errMsg, setErrMsg] = useState(false);

    const { isLoading, login, responseMessage, userInfo } = useContext(AuthContext);
    useEffect(() => {
      if(Object.keys(userInfo).length != 0)
      {
        if(userInfo.code == 401){ setErrMsg(true);}
        else{ setErrMsg(false); }
      }
    }, [userInfo])
    

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.container}>
            <Image  source={require('./../assets/images/axion_logo.png')} style={{width: 144, height: 144, position: 'relative', marginTop: '10%'}} />  
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000', marginBottom: 25}}>AXION CLAIMS</Text>
            {/* <Text>{DeviceInfo.getSystemVersion()}</Text> */}
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter email"
                    onChangeText={text => setEmail(text)}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
                <Button
                    title="Login"
                    onPress={() => {
                        login(email, password);
                    }}
                    style={styles.button}
                    color="#0B64B1"
                />
                {errMsg ? <Text style={styles.errorText}>Credentials Wrong</Text> : ''}
                <Text style={styles.text}>AXION CALIMS - A Seamless Automobile Insurance Claim Processing Solution</Text>
        </View>
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
    },
    wrapper: {
        width: '80%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    input: {
        opacity: .7,
        backgroundColor: '#fff',
        marginBottom: 12,
        marginTop: '3%',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
    },
    errorText: {
        color: 'red',
    },
    link: {
        color: 'blue',
    },
    text: {
        fontSize: 16,
        width: '80%',
        position: 'relative',
        fontWeight: 'bold',
        color: '#fff',
        justifyContent: 'center',
        marginTop: '25%',
    },
    label: {
        color: '#000',
        fontWeight: 'bold',
    }
});

export default LoginScreen;