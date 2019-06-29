import React from "react";
import { createStackNavigator } from "react-navigation";
import HamburgerIcon from "../HamburgerIcon";
import GroupsListScreen from "./screens/GroupsListScreen";
import NewGroupScreen from "./screens/NewGroupScreen";
import GroupDetailsScreen from "./screens/GroupDetailsScreen";

const GroupsNavigator = createStackNavigator(
  {
    Groups: {
      screen: GroupsListScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Groups List",
        path: "groups/list",
        headerLeft: <HamburgerIcon navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    },
    NewGroup: {
      screen: NewGroupScreen,
      navigationOptions: ({ navigation }) => ({
        title: "New Group",
        path: "groups/new",
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    },
    GroupDetails: {
      screen: GroupDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Group Details",
        path: "groups/:id",
        headerStyle: {
          backgroundColor: "#6200ee"
        },
        headerTintColor: "#fff"
      })
    }
  },
  { initialRouteName: "Groups" }
);

export default GroupsNavigator;
