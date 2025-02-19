<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { StackParamList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../../services/api";


export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [number, setNumber] = useState("");

  async function openOrder() {
    if(number === ""){
      return;
    }

    const response = await api.post("/order",{
      table: Number(number)
    })

    //console.log(response.data);
    //precisa fazer a requisição e navegar para a proxima tela
    navigation.navigate("Order", {number: number, order_id: response.data.id });
    setNumber("");
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        style={styles.input}
        placeholder="Numero da Mesa"
        placeholderTextColor="#f0f0f0"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir Mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>
=======
import React, { useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from '../../routes/app.routes';


export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [number, setNumber] = useState('');


  async function openOrder() {
    if(number === ''){
      return;
    }

    navigation.navigate("Order",{number: number, order_id: '4654'});

  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Novo Pedido</Text>

        <TextInput
          style={styles.input}
          placeholder="Numero da Mesa"
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={number}
          onChangeText={setNumber}
        />

        <TouchableOpacity style={styles.button} onPress={openOrder}>
          <Text style={styles.buttonText}> ABRIR MESA </Text>
        </TouchableOpacity>
      </SafeAreaView>
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
<<<<<<< HEAD
    backgroundColor: "#1d1d2e"
  },
  title:{
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
=======
    backgroundColor: "#1D1D2E"
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
    marginBottom: 24,
  },
  input:{
    width: "90%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
<<<<<<< HEAD
    textAlign:"center",
    fontSize: 20,
    color: "#fff",
    borderWidth: 0.3,
    borderColor: "#8a8a8a"
=======
    textAlign: "center",
    fontSize: 22,
    color: "#FFF"
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
  },
  button:{
    width: "90%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText:{
<<<<<<< HEAD
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold"
  }
})
=======
    fontSize:18,
    color: "#101026",
    fontWeight: "bold"
  }

});
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
