import React, { useState } from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Button, Alert, Linking } from 'react-native'
import LogoutButton from '../components/LogoutButton';
import CardComponent from '../components/CardComponent';

const backgroundImage = require('../assets/images/background_screen.jpeg');

export default function ClaimDetalisScreen({ route, navigation }) {
    const { Uuid, Rno, id } = route.params;
    // console.log('Uuid', Uuid)
    // console.log('Rno', Rno)

    let Obj = {
        uuid: Uuid,
        reportNo: Rno,
        id: id,
    }

    const [documents, setDocumnetsExpanded] = useState(false);
    const [video, setVideoExpanded] = useState(false);
    const [photos, setPhotosExpanded] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // perform any necessary data fetching or refreshing operations
        setRefreshing(false);
    };

    const DocumentsExpanded = () => {
        setDocumnetsExpanded(!documents);
    };

    const VideoExpanded = () => {
        setVideoExpanded(!video);
    };

    const PhotosExpanded = () => {
        setPhotosExpanded(!photos);
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
                        <CardComponent navigation={navigation} title='Record Video' path='RecordVideo' status={null} data={Obj} />
                        <CardComponent navigation={navigation} title='Take Photos' path='TakePhotos' status={null} data={Obj} />
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