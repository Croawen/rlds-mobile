import { createDrawerNavigator } from "react-navigation";
import { Dimensions } from "react-native";
import SideMenu from "./SideMenu";
import AccountsNavigator from "./accounts/AccountsNavigator";
import TransactionsNavigator from "./transactions/TransactionsNavigator";
import GroupsNavigator from "./groups/GroupsNavigator";

const DrawerNavigation = createDrawerNavigator(
  {
    Accounts: AccountsNavigator,
    Groups: GroupsNavigator,
    Transactions: TransactionsNavigator
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 130,
    unmountInactiveRoutes: true
  }
);

export default DrawerNavigation;
