import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
<<<<<<< HEAD
import FinishOrder from "../pages/FinishOrder";

export type StackParamList ={
  Dashboard : undefined;
=======

export type StackParamsList = {
  Dashboard: undefined;
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
  Order: {
    number: number | string;
    order_id: string;
  };
<<<<<<< HEAD
  FinishOrder: {
    number: number | string;
    order_id: string
  };
}


const Stack = createNativeStackNavigator<StackParamList>();
=======
};

const Stack = createNativeStackNavigator<StackParamsList>();
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a

function AppRoutes() {
  return (
    <Stack.Navigator>
<<<<<<< HEAD
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Finalizando",
          headerStyle:{
            backgroundColor: "#1d1d2e"
          },
          headerTintColor: "#fff"}}
      />      
=======
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false }}/>
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
    </Stack.Navigator>
  );
}

export default AppRoutes;
