import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/AuthContext";

function Routes() {
  const {isAuthenticated, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F5F7FB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color={"#1D1DE2"} />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
