import React, {useContext, useState} from "react";
<<<<<<< HEAD
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
=======
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";


>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a

import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {

  const { signIn } = useContext(AuthContext);

  const[ email, setEmail] = useState('');
  const[ password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

<<<<<<< HEAD


=======
  
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
  async function handleLogin(){
    if(email === '' || password === ''){
      return;
    }

<<<<<<< HEAD
    await signIn({email, password})
=======
    await signIn({email, password});
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a

  }

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          placeholderTextColor={'#F0F0F0'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha..."
          style={styles.input}
          placeholderTextColor={'#F0F0F0'}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          { loadingAuth ? (
            <ActivityIndicator size={25} color="#FFF"/>
          ):(
            <Text style={styles.buttonText}>ACESSAR</Text>  
          )}          
        </TouchableOpacity>
      </View>        
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D2E'
  },
  logo:{
    marginBottom: 18
  },
  inputContainer:{
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input:{
    width: '95%',
    height: 40,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#FFF',
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: '#3FFFA3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#101026'
  }

});
