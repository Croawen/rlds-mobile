import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, List } from "react-native-paper";
import {
  deleteAccount,
  getAccounts
} from "../../../../common/api/accounts.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";
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
    try {
      const res = await getAccounts();
      this.setState({
        isVisible: true,
        items: res.items,
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        pageCount: res.pageCount
      });
    } catch (e) {}
  }

  render() {
    if (!this.state.isVisible) return null;
    return (
      <View style={{ flex: 1 }}>
        {this.state.items && (
          <ScrollView pagingEnabled={true}>
            <Card style={{ flex: 1 }}>
              {this.state.items.map(item => {
                return (
                  <List.Accordion
                    key={generateId()}
                    title={item.name}
                    description={`${item.balance} ${item.currency}`}
                    left={props => <List.Icon {...props} icon="assignment" />}
                  >
                    <List.Item
                      key={generateId()}
                      title="Details"
                      onPress={() => {
                        this.onEditClick(item.id);
                      }}
                    />
                    <List.Item
                      key={generateId()}
                      title="Delete"
                      onPress={() => {
                        deleteAccount(item.id);
                        this.getAccounts();
                      }}
                    />
                  </List.Accordion>
                );
              })}
            </Card>
          </ScrollView>
        )}

        {!this.state.isVisible && <LoadingIndicator />}

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
    );
  }

  onEditClick = async accountId => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate("AccountDetails", { id: accountId });
  };
}

export default AccountsListScreen;
