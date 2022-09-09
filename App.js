import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Keyboard} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import firebase from './src/services/firebaseConnection';
import Login from './src/pages/Login';
import RenderItems from './src/pages/renderTasks';

export default function App() {
  const [user, setUser] = useState(null);

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef();

  const [key, setKey] = useState('');

  useEffect(() => {
    
    function findTasks(){
      if(!user){
        return;
      }
     firebase.database().ref('tarefas').child(user).once('value', (snapShot) => {
      setTasks([]);
       snapShot?.forEach((childItem) => {
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

    if(newTask === ''){
      return;
    }

    if(key !== ""){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      }).then(() =>{
        const indexTask = tasks.findIndex( item => item.key === key)
        const taskClone = tasks[indexTask].nome = newTask
        setTasks([...taskClone])
      })
      Keyboard.dismiss()
      setNewTask('')
      setKey('');
      return;
    }

    let tarefa =  firebase.database().ref('tarefas').child(user);
    let chave = tarefa.push().key;

    tarefa.child(chave).set({
      nome: newTask
    }).then((value) => {
      const data = {
        key: chave,
        nome: newTask
      }
      setTasks(oldTasks => [...oldTasks, data])
      Keyboard.dismiss

    })
    Keyboard.dismiss();
    setNewTask('');
  }

  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove().then(() => {
      const locateTask = tasks.filter(item => item.key !== key)
      setTasks(locateTask)
    })
  }
  function handleEdit(data){
    setNewTask(data.nome);
    inputRef.current.focus();
    setKey(data.key)
  }
  function closeEdit(){
    setKey(''),
    setNewTask('')
    Keyboard.dismiss()
    return;
  }

  if(!user){
    return <Login changeStatus={(user) => setUser(user)}/>  
  }
  
  return (
    <SafeAreaView>
      {key.length > 0 && (
         <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 5}}>
         <TouchableOpacity onPress={closeEdit}>
           <Feather name='x-circle' size={20} color='#FF0000'/>
         </TouchableOpacity>
         <Text style={{ marginBottom: 8, color:'#FF0000'}}> Você está editando uma tarefa</Text>
     </View>
      )}
     

        <View style={styles.containerTasks}>
            <TextInput
              style={styles.input}
              placeholder='Nova tarefa'
              value={newTask}
              onChangeText={text => setNewTask(text)}
              ref={inputRef}
            />
            <TouchableOpacity style={styles.btnArea} onPress={handleAdd}>
                <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        </View>
      
        <FlatList
          data={tasks}
          keyExtractor={item => item.key}
          renderItem={({item}) => <RenderItems data={item} deleteTarefa={handleDelete} editTarefa={handleEdit}/>}
        />
      
    </SafeAreaView>
   );
 }

const styles = StyleSheet.create({
  containerTasks: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 10,
    marginBottom: 50,
  },
  input: {
    width: '88%',
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#121212',
    fontSize: 16,
    marginRight: 10,
  },
  btnArea: {
    width: 26,
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