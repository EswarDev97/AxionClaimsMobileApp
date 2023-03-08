import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonComponent = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress='ss'>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#2196F3', borderRadius: 5 }}>
        {/* {icon && <Icon name={icon} size={20} color='#fff' style={{ marginRight: 5 }} />} */}
        <Text style={{ color: '#fff' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;