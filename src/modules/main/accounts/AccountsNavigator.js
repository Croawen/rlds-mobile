import React from "react";
import { createStackNavigator } from "react-navigation";
import AccountsListScreen from "./screens/AccountsListScreen";
import HamburgerIcon from "../HamburgerIcon";
import NewAccountScreen from "./screens/NewAccountScreen";
import AccountDetailsScreen from "./screens/AccountDetailsScreen";

const AccountsNavigator = createStackNavigator(
  {
    Accounts: {
      screen: AccountsListScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Accounts List",
        path: "accounts/list",
        headerLeft: <HamburgerIcon navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    },
    NewAccount: {
      screen: NewAccountScreen,
      navigationOptions: ({ navigation }) => ({
        title: "New Account",
        path: "accounts/new",
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    },
    AccountDetails: {
      screen: AccountDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Account Details",
        path: "accounts/:id",
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    }
  },
  { initialRouteName: "Accounts" }
);

export default AccountsNavigator;
