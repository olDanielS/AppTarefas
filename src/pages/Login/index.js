import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import firebase from '../../services/firebaseConnection';

console.disableYellowBox = true;


export default function Login({changeStatus}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acao, setAcao] = useState('Acessar');

    async function changeAction(){
        if(acao === 'Acessar'){
            await firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
                changeStatus(value.user.uid);
            }).catch((error) => {
                alert('Ops, algo deu errado, tente novamente!')
            })
            }else{
                await firebase.auth().createUserWithEmailAndPassword(email, password).then((value)=> {
                    alert('Usuario criado!')
                    setEmail('')
                    setPassword('')
                }).catch((error) => {
                    alert('Ops, algo deu errado, tente novamente!')
                    
                })
            }
        }
    

return (
    <SafeAreaView style={styles.container}>
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder='Email'
        />
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder='Senha'
            secureTextEntry
        />

        <TouchableOpacity style={[styles.areaBtn, {backgroundColor: acao === 'Acessar' ? '#483D8B' : '#DAA520'}]} onPress={changeAction} >
            <Text style={styles.txtBtn}>{acao === 'Acessar' ? 'Acessar' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity >
            <Text onPress={() => setAcao( acao=> acao ==='Acessar' ? 'Cadastrar' : 'Acessar' )}> {acao === 'Acessar' ? 'Criar Conta' : 'Já possui uma conta?'}</Text>
        </TouchableOpacity>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 10
    },
    input: {
        width: '100%',
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#121212',
        marginBottom: 10,
        fontSize: 16
    },
    areaBtn:{
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    txtBtn: {
        fontSize: 20,
        color: '#FFF'
    }
})