import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Button, Alert, Linking } from 'react-native'
import LogoutButton from '../components/LogoutButton';
import CardComponent from '../components/CardComponent';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/images/background_screen.jpeg');

export default function ClaimDetalisScreen({ route, navigation }) {
    const { Uuid, Rno, id } = route.params;
    // console.log('claim id', id)
    // console.log('Rno', Rno)

    let Obj = {
        uuid: Uuid,
        reportNo: Rno,
        id: id,
    }

    const [refreshing, setRefreshing] = useState(false);
    const [sessionData, setSessionData] = useState(null);
    const [sessionLink, setSessionLink] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        // perform any necessary data fetching or refreshing operations
        setRefreshing(false);
    };

    const fetchData = async () => {
        const result = await axios
            .post(`${BASE_URL}/get-session-link`, {
                id
            });
        AsyncStorage.setItem('SessionLinkInfo', JSON.stringify(result.data));
        setSessionData(result.data);
        // console.log('result Session Link', result.data);
        if(result.data.data != null)
        {
            let sessionId = result.data.data.activeSessionId;
            let url = `${IMAGE_URL}axion-claimsurvey/customer-survey?id=${Uuid}&sessionid=${sessionId}`;
            setSessionLink(url);
            // console.log(url);
        }
    };
    // console.log('setSessionLink', sessionLink);

    return (
        <React.Fragment>
            <ImageBackground source={backgroundImage} style={styles.background}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.container}>
                        {/* <Button
                            title="Open Web"
                            onPress={() => navigation.navigate('WebPage')}
                        /> */}
                        <CardComponent navigation={navigation} title='Record Video / Take Photos' path={sessionLink != null ? sessionLink : '' } status="openWeb" data={Obj} />
                        {/* <CardComponent navigation={navigation} title='Take Photos' path='TakePhotos' status={null} data={Obj} /> */}
                        <CardComponent navigation={navigation} title='Upload Documents' path='UploadDocuments' status={null} data={Obj} />
                    </View>
                </ScrollView>
            </ImageBackground>
            <LogoutButton />
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
        marginTop: '40%',
    },
});