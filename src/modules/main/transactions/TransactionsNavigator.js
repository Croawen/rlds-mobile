import React from "react";
import { createStackNavigator } from "react-navigation";
import HamburgerIcon from "../HamburgerIcon";
import NewTransactionScreen from "./screens/NewTransactionScreen";
import TransactionDetailsScreen from "./screens/TransactionDetailsScreen";
import TransactionsListScreen from "./screens/TransactionsListScreen";

const TransactionsNavigator = createStackNavigator(
  {
    Transactions: {
      screen: TransactionsListScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Transactions List",
        path: "transactions/list",
        headerLeft: <HamburgerIcon navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    },
    NewTransaction: {
      screen: NewTransactionScreen,
      navigationOptions: ({ navigation }) => ({
        title: "New Transaction",
        path: "transactions/new",
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    },
    TransactionDetails: {
      screen: TransactionDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Transaction Details",
        path: "transactions/:id",
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    }
  },
  { initialRouteName: "Transactions" }
);

export default TransactionsNavigator;
