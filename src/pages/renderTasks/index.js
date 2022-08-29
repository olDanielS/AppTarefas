import React from 'react';
import { View, Text } from 'react-native';

export default function RenderItems(item) {
 return (
   <View> 
        <Text> {item.data.nome}</Text>
   </View>
  );
}