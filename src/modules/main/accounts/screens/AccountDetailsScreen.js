import React from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, Card, TextInput } from "react-native-paper";
import { getAccount, updateAccount } from "../../../../common/api/accounts.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";

class AccountDetailsScreen extends React.Component {
  state = {
    loading: false,
    account: null
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam("id");
    await this.getAccount(id);
  }

  async getAccount(accountId) {
    try {
      const account = await getAccount(accountId);

      this.setState({
        account
      });
    } catch (e) {}
  }

  renderForm() {
    const account = this.state.account;
    if (!account) {
      return null;
    }
    return (
      <View>
        <ScrollView>
          <Card>
            <Card.Title
              title="Account Info"
              subtitle="Edit basic account information"
            />
            <Card.Content>
              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Name"
                  editable={true}
                  value={account.name}
                  onChangeText={val => {
                    this.setState({
                      account: { ...this.state.account, name: val }
                    });
                  }}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Description"
                  editable={true}
                  value={account.description}
                  onChangeText={val => {
                    this.setState({
                      account: { ...this.state.account, description: val }
                    });
                  }}
                />
              </View>
            </Card.Content>
            <Button
              loading={this.state.loading}
              mode="contained"
              onPress={this.onSubmitClick}
            >
              Save changes
            </Button>
          </Card>

          <Card>
            <Card.Title
              title="Account Details"
              subtitle="View additional information about this account"
            />
            <Card.Content>
              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Group"
                  value={account.groupName}
                  disabled={true}
                  editable={false}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Currency"
                  disabled={true}
                  editable={false}
                  value={account.currency}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Balance"
                  disabled={true}
                  editable={false}
                  value={account.balance ? account.balance.toString() : "0"}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Transactions"
                  disabled={true}
                  editable={false}
                  value={
                    account.transactionCount
                      ? account.transactionCount.toString()
                      : "0"
                  }
                />
              </View>
            </Card.Content>
          </Card>
          <Toast ref="toast" />
        </ScrollView>
      </View>
    );
  }
  render() {
    return this.state.account ? this.renderForm() : <LoadingIndicator />;
  }

  onSubmitClick = async () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      try {
        await updateAccount(this.state.account.id, this.state.account);
        this.setState({ loading: false });
        this.refs.toast.show("Account updated.");
      } catch (e) {
        this.refs.toast.show("Invalid data provided.");
        this.setState({ loading: false });
      }
    }, 1000);
  };
}

export default AccountDetailsScreen;
