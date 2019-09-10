import React from "react";
import { createDrawerNavigator } from "react-navigation";
import { connect } from "react-redux";
import { DrawerItems } from "react-navigation";
import { Dimensions, View, SafeAreaView } from "react-native";
import AccountsNavigator from "./accounts/AccountsNavigator";
import TransactionsNavigator from "./transactions/TransactionsNavigator";
import GroupsNavigator from "./groups/GroupsNavigator";
import { clearCurrentUser } from "../../common/storage";
import { Button, Drawer } from "react-native-paper";

const createDrawerItem = (props, navigation) => {
  return (
    <Drawer.Item
      key={props.key}
      label={props.routeName}
      active={props.routeName === navigation.state.routeName}
      onPress={() => {
        navigation.navigate(props.routeName);
      }}
    />
  );
};

const DrawerNavigation = createDrawerNavigator(
  {
    Accounts: AccountsNavigator,
    Groups: GroupsNavigator,
    Transactions: TransactionsNavigator
  },
  {
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          {props.items &&
            props.items.map(c => createDrawerItem(c, props.navigation))}
          <Button
            title="Logout"
            mode="contained"
            onPress={() => {
              clearCurrentUser();
              props.navigation.navigate("Login");
            }}
          >
            Logout
          </Button>
        </SafeAreaView>
      </View>
    ),
    drawerWidth: Dimensions.get("window").width - 130,
    unmountInactiveRoutes: true
  }
);

export default connect(
  state => ({}),
  dispatch => ({})
)(DrawerNavigation);
