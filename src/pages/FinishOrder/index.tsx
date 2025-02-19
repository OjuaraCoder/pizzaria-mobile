import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes/app.routes";

type RouteDetailParams = {
    FinishOrder:{
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams,"FinishOrder">

export default function FinishOrder() {
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    async function handleFinish() {
        try {
            await api.put("/order/send",{
                order_id: route.params?.order_id
            })

            navigation.popToTop();

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.alert}>Deseja finalizar esse pedido?</Text>
        <Text style={styles.title}>Mesa {route.params.number} </Text>

        <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.textButton}>Finalizar pedido</Text>
            <Feather size={20} name="shopping-cart" color="#1d1d2e"/>
        </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D2E',
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    textAlign: "center",    
  },
  alert:{
    fontSize:22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 24
  },
  title:{
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12
    
  },
  button:{
    backgroundColor: "#3fffa3",
    flexDirection: "row",
    width: "65%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  textButton:{
    fontSize: 18,
    marginRight: 12,
    fontWeight: "bold",
    color: "#1d1d2e"
  }

});
