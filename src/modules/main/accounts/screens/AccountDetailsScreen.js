import React from "react";
import { View } from "react-native";
import { getAccount } from "../../../../common/api/accounts.api";
import { TextInput } from "react-native-paper";
import { getFilteredTransactions } from "../../../../common/api/tranasctions.api";

class AccountDetailsScreen extends React.Component {
  state = {
    account: null
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam("id");
    await this.getAccount(id);
  }

  async getAccount(accountId) {
    try {
      const account = await getAccount(accountId);
      const transactionsIn = (await getFilteredTransactions(1, {
        targetAccountId: accountId
      })).Items.length;
      const transactionsOut = (await getFilteredTransactions(1, {
        sourceAccountId: accountId
      })).Items.length;

      this.setState({
        account: {
          ...account,
          transactionsIn,
          transactionsOut,
          transactions: transactionsIn + transactionsOut
        }
      });
    } catch (e) {}
  }

  render() {
    const account = this.state.account;
    if (!account) {
      return null;
    }

    return (
      <View style={{ flex: 1, marginTop: -64 }}>
        <View style={{ padding: 25 }}>
          <TextInput
            mode="outlined"
            label="Name"
            editable={false}
            value={account.Name}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput mode="outlined" label="Group" value={account.Group.Name} />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Currency"
            editable={false}
            value={account.Currency.Name}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Transactions"
            editable={false}
            value={account.transactions ? account.transactions.toString() : "0"}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Transactions in"
            editable={false}
            value={
              account.transactionsIn ? account.transactionsIn.toString() : "0"
            }
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Transactions out"
            editable={false}
            value={
              account.transactionsOut ? account.transactionsOut.toString() : "0"
            }
          />
        </View>
      </View>
    );
  }
}

export default AccountDetailsScreen;
