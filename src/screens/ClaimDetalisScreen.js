import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import LogoutButton from '../components/LogoutButton';

export default function ClaimDetalisScreen({ route }) {
    const { id } = route.params;
    console.log('details', id)

    const [documents, setDocumnetsExpanded] = useState(false);
    const [video, setVideoExpanded] = useState(false);
    const [photos, setPhotosExpanded] = useState(false);

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
            <View style={styles.container}>

                <View style={styles.card}>
                    <TouchableOpacity onPress={DocumentsExpanded}>
                        <Text style={styles.title}>Documents Upload</Text>
                    </TouchableOpacity>
                    {documents && (
                        <View style={styles.dataContainer}>
                            <Text>You can Upload your documents here</Text>
                        </View>
                    )}
                </View>

                <View style={styles.card}>
                    <TouchableOpacity onPress={VideoExpanded}>
                        <Text style={styles.title}>Offline Video</Text>
                    </TouchableOpacity>
                    {video && (
                        <View style={styles.dataContainer}>
                            <Text>You can Upload your Offline Video here</Text>
                        </View>
                    )}
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={PhotosExpanded}>
                        <Text style={styles.title}>Take Photos</Text>
                    </TouchableOpacity>
                    {photos && (
                        <View style={styles.dataContainer}>
                            <Text>You can Upload your Photos here</Text>
                        </View>
                    )}
                </View>
            </View>
            <LogoutButton />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        width: '100%',
        marginRight: 15,
    },
    card: {
        width: '80%',
        backgroundColor: '#215190',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        marginBottom: 10,
        marginLeft: '9%',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataContainer: {
        marginTop: 10,
    },
    dataItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});