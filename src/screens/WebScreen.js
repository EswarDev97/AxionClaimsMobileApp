import { View, Text, Button, Linking } from 'react-native'
import React from 'react'

export default function WebScreen() {

    const handleOpenURL = (url) => {
        Linking.openURL(url);
    };
  
  return (
    <View>
      <Text>WebScreen</Text>
      <Button
      title="Open URL"
      onPress={() => handleOpenURL('https://google.com')}
    />
    </View>
  )
}