import { View, Text } from 'react-native'
import React from 'react'

const Item = ({ item, navigateToScreen }) => {
    console.log('item', item);
    return (
      <TouchableOpacity onPress={() => navigateToScreen('Claimdetails', { item })}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  export default Item