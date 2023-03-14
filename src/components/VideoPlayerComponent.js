import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { VIDEO_URL } from '../config';

const VideoPlayComponent = ({ data }) => {
    // console.log('component data',data);

    return (
        <View style={styles.container}>
            <VideoPlayer
                source={{ uri: `${VIDEO_URL}${data}` }}
                style={{ height: 200 }}
                resizeMode="contain"
                repeat={true}
                onBack={() => null}
                disableBack={true}
                disableFullscreen={false}
                controls={true}
            />
            {/* <Video
                source={{ uri: 'https://nia.axionpcs.in/videos/1004-6383710391-6383710391-07-03-2023_03:57:52_PM.mp4' }}
                style={styles.video}
                paused={false}
                repeat={true}
                onError={(error) => console.error(error)}
                onLoad={() => console.log('video loaded')}
                controls={true}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    video: {
        width: '100%',
        height: 300,
    },
});

export default VideoPlayComponent;