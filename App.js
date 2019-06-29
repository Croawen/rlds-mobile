import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AuthLoadingScreen from "./src/modules/auth/AuthLoadingScreen";
import LoginScreen from "./src/modules/auth/LoginScreen";
import RegisterScreen from "./src/modules/auth/RegisterScreen";
import { Provider as PaperProvider } from "react-native-paper";
import DrawerNavigation from "./src/modules/main/DrawerNavigation";

const AuthSwitch = createSwitchNavigator({
  Login: { screen: LoginScreen, path: "login" },
  Register: { screen: RegisterScreen, path: "register" }
});

const AppContainer = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthSwitch,
    App: DrawerNavigation
  })
);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </Provider>
  );
}
