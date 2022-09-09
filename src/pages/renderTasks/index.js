import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function RenderItems({data, deleteTarefa, editTarefa}) {
 return (
   <View style={styles.container}> 
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => deleteTarefa(data.key)}>
            <Feather name='trash-2' size={20} color='#FFF'/>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => editTarefa(data)}>
          <Text style={styles.nome}> {data.nome}</Text>
        </TouchableWithoutFeedback>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    width: '94%',
    height: 40,
    marginTop: 10,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#000',
  },
  nome: {
    fontSize: 18,
    color: '#FFF'
  }
})