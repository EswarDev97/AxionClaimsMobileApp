import React, {useContext} from 'react';
import { TouchableOpacity, Text } from 'react-native';

const UploadButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
    style={{
      alignItems: 'center',
      textAlign: 'center',
      width: '60%',
      backgroundColor: '#0B64B1',
      padding: '5%',
      marginRight: 10,
      marginBottom: 30,
      borderRadius: 10,
    }}
    onPress={onPress}
    >
    <Text style={{ color: '#fff', fontSize: 16,}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default UploadButton;