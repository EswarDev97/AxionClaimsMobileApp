import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import LogoutButton from '../components/LogoutButton';
import VideoPlayComponent from '../components/VideoPlayerComponent';

const backgroundImage = require('../assets/images/background_screen.jpeg');

const RecordVideo = ({ route }) => {

    const { data } = route.params;

    const [videoInfo, setVideoInfo] = useState({});

    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        let id = data.id;
        // let id = 4;
        const result = await axios
            .post(`${BASE_URL}/get-offline-video`, {
                id
            });
        AsyncStorage.setItem('RecordVideoInfo', JSON.stringify(result.data));
        setVideoInfo(result.data.data);

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
                        <Text style={styles.title}>Record Video</Text>
                        {
                            (videoInfo !== null) ?

                                // execute function on each object
                                // <Text style={styles.text}>Video is available</Text>
                                <VideoPlayComponent data={videoInfo.videoName} />
                                : <Text style={styles.text}>Video is not available</Text>
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
    text: {
        color: '#000',
        fontSize: 18,
        marginTop: "30%",
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 10,
    },
});

export default RecordVideo;