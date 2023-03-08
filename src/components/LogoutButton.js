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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
      onPress={logout}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>LOGOUT</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;