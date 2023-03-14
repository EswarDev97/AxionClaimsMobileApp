import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { IMAGE_URL } from '../config';

const ImageCardDisplay = ({ data }) => {
  
  return (
    <React.Fragment>
      {
        data.map((obj) => {
          // console.log(obj.type);
          return (
            <Card key={obj.id}>
              <Card.Title>{obj.type}</Card.Title>
              <Card.Divider />
              <View style={styles.imageContainer}>
                {
                  obj.image != null ?
                    <Image
                      source={{ uri: `${IMAGE_URL}${obj.image}` }}
                      resizeMode="cover"
                      style={styles.image}
                    /> : ''
                }
              </View>
              <Card.Divider />
            </Card>
          );
        })
      }
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCardDisplay;