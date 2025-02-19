<<<<<<< HEAD
import React, {useContext} from "react";
=======
import React, { useContext } from "react";
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a
import { ActivityIndicator, View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/AuthContext";

function Routes() {
<<<<<<< HEAD
  const { isAuthenticated, loading } = useContext(AuthContext)
=======
  const {isAuthenticated, loading} = useContext(AuthContext);
>>>>>>> 330cfcc7e027e5560dd2f23109f513c49a99dd4a

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
