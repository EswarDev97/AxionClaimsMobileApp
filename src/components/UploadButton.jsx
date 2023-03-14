import React, {useContext} from 'react';
import { TouchableOpacity, Text } from 'react-native';

const UploadButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
    style={{
      width: '40%',
      backgroundColor: '#0B64B1',
      padding: '3%',
      marginRight: 10,
      marginBottom: 5,
      borderRadius: 10,
    }}
    onPress={onPress}
    >
    <Text style={{ color: '#fff', fontSize: 16,}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default UploadButton;