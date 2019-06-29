import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Card, List } from "react-native-paper";
import { getAccounts } from "../../../../common/api/accounts.api";
import generateId from "../../../../common/helpers/generateId";

class AccountsListScreen extends React.Component {
  state = {
    isVisible: false,
    items: null,
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0
  };

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.getAccounts();
    });
  }

  async getAccounts() {
    const res = await getAccounts();
    this.setState({
      isVisible: true,
      items: res.Items,
      pageNumber: res.PageNumber,
      pageSize: res.PageSize,
      pageCount: res.PageCount
    });
  }

  render() {
    return this.state.isVisible ? (
      <ScrollView pagingEnabled={true}>
        <View style={{ flex: 1 }}>
          <Card style={{ flex: 1 }}>
            {this.state.items &&
              this.state.items.map(item => {
                return (
                  <List.Item
                    key={generateId()}
                    title={item.Name}
                    description={item.Currency.Name}
                    onPress={() => this.onItemClick(item.AccountId)}
                    left={props => <List.Icon {...props} icon="folder" />}
                  />
                );
              })}
          </Card>

          <Button
            mode="contained"
            loading={false}
            onPress={() => {
              this.setState({ isVisible: false });
              this.props.navigation.navigate("NewAccount");
            }}
          >
            Create an account
          </Button>
        </View>
      </ScrollView>
    ) : null;
  }

  onItemClick = async accountId => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate("AccountDetails", { id: accountId });
  };
}

export default AccountsListScreen;
