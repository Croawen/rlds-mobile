import React from "react";
import { YellowBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import AuthLoadingScreen from "./src/modules/auth/AuthLoadingScreen";
import LoginScreen from "./src/modules/auth/LoginScreen";
import RegisterScreen from "./src/modules/auth/RegisterScreen";
import DrawerNavigation from "./src/modules/main/DrawerNavigation";
import store from "./src/redux/store";

export const AuthSwitch = createSwitchNavigator({
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

YellowBox.ignoreWarnings(["Require cycle:"]);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </Provider>
  );
}
