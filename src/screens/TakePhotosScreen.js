import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import LogoutButton from '../components/LogoutButton';
import ImageCardDisplay from '../components/ImageDisplayComponent';

const backgroundImage = require('../assets/images/background_screen.jpeg');

const TakePhotos = ({ route }) => {
    const { data } = route.params;

    const [refreshing, setRefreshing] = useState(false);
    const [imageInfo, setImageInfo] = useState({});

    // console.log('upload data', data);
    const fetchData = async () => {
        let id = data.id;
        const result = await axios
            .post(`${BASE_URL}/get-assements-image-data`, {
                id
            });
        AsyncStorage.setItem('UploadTakeImageInfo', JSON.stringify(result.data));
        setImageInfo(result.data.data);

        // console.log('result', result.data.data);
    };

    useEffect(() => {
        fetchData();
    }, [])


    const onRefresh = () => {
        setRefreshing(true);
        fetchData()
        setRefreshing(false);
    };

    return (
        <React.Fragment>
            <ImageBackground source={backgroundImage} style={styles.background}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >

                    <View style={styles.container}>
                        <Text style={styles.title}>Take Photos</Text>
                        {
                             (imageInfo.length > 0) ?
                               
                                  // execute function on each object
                                  <ImageCardDisplay data={imageInfo}/>
                                 : ''
                                
                              
                        }
                        
                    </View>
                </ScrollView>
                <LogoutButton />
            </ImageBackground>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        bottom: 0,
        top: 0,
        flex: 1,
        alignItems: 'center',
        marginTop: '15%',
        marginBottom: '20%',
    },
    title: {
        color: '#fff',
        fontSize: 24,

    },
});

export default TakePhotos;