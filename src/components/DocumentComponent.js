import React, { useState, useEffect } from 'react';
import { Text } from 'native-base';
import { StyleSheet, View, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DOCS_URL } from '../config';
import UploadButton from './UploadButton';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DocumentComponent({ title, data, refresh }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [typeImage, setTypeImage] = useState(false)

  // console.log('data', data);

  useEffect(() => {
    if (data !== null && data.length > 0) {
      // Access the first object in the array
      setSelectedImage(`${DOCS_URL}${data[0].referenceNo}-docs-upload/${data[0].file_name}`);
      const filePath = `${DOCS_URL}${data[0].referenceNo}-docs-upload/${data[0].file_name}`;
      const extension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();

      if (extension === 'pdf') {
        setTypeImage(false)
      } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
        setTypeImage(true)
      }
    }
  }, [data])


  async function requestStoragePermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission Required',
            message: 'This app needs access to your storage to choose a photo',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
          return true;
        } else {
          console.log('Storage permission denied');
          return false;
        }
      } else {
        // For iOS, permission is granted automatically
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  const uploadDocument = async (Obj) => {

    let claimsurveyUuid = Obj.uuid;
    let referenceNo = Obj.reportNo;
    let type = Obj.type;
    let image = Obj.path;

    const result = await axios
      .post(`${BASE_URL}/upload-document`, {
        claimsurveyUuid,
        referenceNo,
        type,
        image,
      });
      refresh()
    // AsyncStorage.setItem('UploadDocumentsInfo', JSON.stringify(result.data));
    // setDocsInfo(result.data.data);

    // console.log('result', `${BASE_URL}/upload-document`);
  };

  const deleteDocument = async (Obj) => {
    console.log('delete', Obj);
    let referenceNo = Obj.reportNo;
    let file_name = Obj.file_name;
    let id = Obj.id;

    const result = await axios
      .post(`${BASE_URL}/document-file-remove`, {
        referenceNo,
        file_name,
        id,
      });
    if (result.status) {
      setSelectedImage(null)
      refresh();
    } else {
      console.log('document removed fialed from script');
    }
    // setSelectedImage(null)
    // AsyncStorage.setItem('UploadDocumentsInfo', JSON.stringify(result.data));
    // setDocsInfo(result.data.data);

    // console.log('result', `${BASE_URL}/upload-document`);
  };

  const localFilePathToBlobUrl = async (filePath) => {
    try {

      const response = await RNFetchBlob.fs.readFile(filePath, 'base64');
      const base64Data = `data:image/png;base64,${response}`;

      let DocObj = {
        reportNo: data[0].referenceNo,
        uuid: data[0].claimsurveyUuid,
        file_name: data[0].file_name,
        type: data[0].type,
        path: base64Data,
      }
      // console.log('uploadDocument', DocObj);
      uploadDocument(DocObj);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleImagePickerResponse(response) {
    const hasPermission = await requestStoragePermission();
    // console.log('hasPermission', hasPermission);
    if (hasPermission) { }
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      localFilePathToBlobUrl(response.assets[0].uri)
      setSelectedImage(response.assets[0].uri);
    }
  }

  function handleImagePicker() {
    launchImageLibrary({}, handleImagePickerResponse);
  }
  const removeImage = () => {
    let DocObj = {
      reportNo: data[0].referenceNo,
      file_name: data[0].file_name,
      id: data[0].id,
    }
    deleteDocument(DocObj);
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View>


        <View style={{ flexDirection: 'row' }}>
          {data !== null && data.length > 0 && data[0].file_name !== null ? (
            <UploadButton title="Remove" onPress={removeImage} />
          ) : (
            <UploadButton title="Upload" onPress={handleImagePicker} />
          )}
        </View>

        {selectedImage && (
          <View>
            {
              typeImage ?
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 200, height: 100, marginBottom: 10, }}
                /> : ''
              // <WebView source={{ uri: selectedImage }}
              // style={{ width: 200, height: 100, marginBottom: 10, }} />
            }
          </View>
        )}
      </View>
      {/* <Button title="Upload Document" onPress={handleImagePicker} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 20,
  },
})

export default DocumentComponent;