import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList} from 'react-native';

import firebase from './src/services/firebaseConnection';
import Login from './src/pages/Login';
import RenderItems from './src/pages/renderTasks';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    
    function findTasks(){
      if(!user){
        return;
      }
     firebase.database().ref('tarefas').child(user).once('value', (snapShot) => {
       snapShot?.forEach(childItem => {
         let data = {
           key: childItem.key,
           nome: childItem.val().nome
         }
         setTasks(oldTasks => [...oldTasks, data])
       })
     })
   }
   findTasks();
 }, [user])

  function handleAdd(){
    const tarefa =  firebase.database().ref('tarefas').child(user);
    const chave = tarefa.push().key;

    tarefa.child(chave).set({
      nome: newTask
    }).then((value) => {
      let data = {
        chave: chave,
        tarefa: tasks
      }
      setTasks(oldData =>[ ...oldData, data])
      alert('tarefa cadastrada' + newTask)
    }).catch((error) => {
      alert('Ops, algo deu errado!')
    })
  }

  if(!user){
    return <Login changeStatus={(user) => setUser(user)}/>  
  }
  


  return (
    <SafeAreaView>
        <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder='Nova tarefa'
              value={tasks}
              onChangeText={text => setNewTask(text)}
            />
            <TouchableOpacity style={styles.btnArea} onPress={handleAdd}>
                <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        </View>
      
        <FlatList
          data={tasks}
          keyExtractor={item => item.key}
          renderItem={({item}) => <RenderItems data={item} />}
        />
      
    </SafeAreaView>
   );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 10
  },
  input: {
    width: '90%',
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#121212',
    marginBottom: 10,
    fontSize: 16,
    marginRight: 5,
  },
  btnArea: {
    width: 25,
    height: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    },
  btnText: {
    fontSize: 20,
    color: '#FFF'
  }
})