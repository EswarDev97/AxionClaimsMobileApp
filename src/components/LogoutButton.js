import React, {useContext} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#d2d2d4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
      }}
      onPress={logout}
    >
      <Text style={{ color: '#000', fontSize: 16 }}>LOGOUT</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;