import React from "react";
import { Picker, ScrollView, View } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, Text, TextInput } from "react-native-paper";
import { getAccounts } from "../../../../common/api/accounts.api";
import {
  createTransaction,
  getCategories
} from "../../../../common/api/transactions.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";
import NumericInput from "../../../../common/components/NumericInput";
import generateId from "../../../../common/helpers/generateId";

class NewTransactionScreen extends React.Component {
  state = {
    categories: null,
    accounts: null,
    category: null,
    targetAccount: null,
    sourceAccount: null,
    transactionTypes: null,
    type: null,
    title: "",
    amount: 0
  };

  async componentDidMount() {
    const categoriesRes = await getCategories();
    const accountsRes = await getAccounts(0, 100);
    if (categoriesRes && accountsRes) {
      let transactionTypes = [];
      if (accountsRes.items.length > 0) {
        transactionTypes = [
          { value: "DEPOSIT", label: "DEPOSIT" },
          { value: "WITHDRAW", label: "WITHDRAW" }
        ];
      }
      if (accountsRes.items.length > 1) {
        transactionTypes = transactionTypes.concat([
          { value: "TRANSFER", label: "TRANSFER" }
        ]);
      }
      this.setState({
        categories: categoriesRes.categories,
        category: categoriesRes.categories[0],
        transactionTypes: transactionTypes,
        type: transactionTypes.length > 0 ? transactionTypes[0].value : null,
        accounts: accountsRes.items.map(a => ({ value: a.id, label: a.name })),
        sourceAccount: accountsRes.items[0].id,
        targetAccount: accountsRes.items[0].id
      });
    }
  }

  render() {
    if (!this.state.transactionTypes) {
      return <LoadingIndicator />;
    }
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ padding: 25 }}>
            <TextInput
              mode="outlined"
              label="Title"
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })}
            />
          </View>

          <View style={{ padding: 25, paddingTop: 0 }}>
            <NumericInput
              label="Amount"
              value={this.state.amount}
              onChange={val => this.setState({ amount: val })}
            />
          </View>

          <View style={{ paddingHorizontal: 25 }}>
            <Text>Type</Text>
            <Picker
              selectedValue={this.state.type}
              onValueChange={val => {
                this.setState({
                  type: val,
                  sourceAccount:
                    val === "TRANSFER" || val === "WITHDRAW"
                      ? this.state.accounts[0].value
                      : null,
                  targetAccount:
                    val === "TRANSFER" || val === "DEPOSIT"
                      ? this.state.accounts[0].value
                      : null
                });
              }}
              children={this.state.transactionTypes.map(item => {
                return (
                  <Picker.Item
                    key={generateId()}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            />
          </View>

          <View style={{ paddingHorizontal: 25 }}>
            <Text>Category</Text>
            <Picker
              selectedValue={this.state.category}
              onValueChange={val => {
                this.setState({
                  category: val
                });
              }}
              children={this.state.categories.map(item => {
                return (
                  <Picker.Item key={generateId()} label={item} value={item} />
                );
              })}
            />
          </View>

          {(this.state.type === "TRANSFER" ||
            this.state.type === "WITHDRAW") && (
            <View style={{ paddingHorizontal: 25 }}>
              <Text>Source account</Text>
              <Picker
                selectedValue={this.state.sourceAccount}
                onValueChange={val => {
                  this.setState({
                    sourceAccount: val
                  });
                }}
                children={this.state.accounts.map(item => {
                  return (
                    <Picker.Item
                      key={generateId()}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              />
            </View>
          )}

          {(this.state.type === "TRANSFER" ||
            this.state.type === "DEPOSIT") && (
            <View style={{ paddingHorizontal: 25 }}>
              <Text>Target account</Text>
              <Picker
                selectedValue={this.state.targetAccount}
                onValueChange={val => {
                  this.setState({
                    targetAccount: val
                  });
                }}
                children={this.state.accounts.map(item => {
                  return (
                    <Picker.Item
                      key={generateId()}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              />
            </View>
          )}

          <Button
            mode="contained"
            loading={this.state.loading}
            onPress={this.onSubmitClick}
          >
            Submit
          </Button>

          <Toast ref="toast" />
        </View>
      </ScrollView>
    );
  }

  onSubmitClick = async () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      try {
        await createTransaction(this.state);
        this.setState({ loading: false });
        this.refs.toast.show("Transaction created.");

        setTimeout(async () => {
          this.props.navigation.pop();
        }, 1000);
      } catch (e) {
        switch (e.statusCode) {
          case 400:
            this.refs.toast.show("Invalid data provided.");
            break;
          case 460:
            this.refs.toast.show("Insignificant balance on source account.");
            break;
          default:
            this.refs.toast.show("Unexpected server error.");
            break;
        }
        this.setState({ loading: false });
      }
    }, 1000);
  };
}

export default NewTransactionScreen;
