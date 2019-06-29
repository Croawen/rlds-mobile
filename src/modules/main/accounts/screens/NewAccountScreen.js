import React from "react";
import { View, Picker } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { getCurrencies } from "../../../../common/api/currencies.api";
import { getGroups } from "../../../../common/api/groups.api";
import generateId from "../../../../common/helpers/generateId";
import NumericInput from "../../../../common/components/NumericInput";
import { createAccount } from "../../../../common/api/accounts.api";
import Toast, { DURATION } from "react-native-easy-toast";

class NewAccountScreen extends React.Component {
  state = {
    currencies: [],
    groups: [],
    groupId: "",
    currencyId: "",
    name: "",
    startAmount: 0
  };

  async componentDidMount() {
    const currencies = await getCurrencies();
    const groups = await getGroups();
    if (currencies && groups) {
      this.setState({
        currencies: currencies.Items,
        groups: groups.Items,
        currencyId: currencies.Items[0].CurrencyId,
        groupId: groups.Items[0].GroupId
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: -64 }}>
        <View style={{ padding: 25 }}>
          <Text>Currency</Text>
          <Picker
            selectedValue={this.state.currencyId}
            onValueChange={val => {
              this.setState({
                currencyId: val
              });
            }}
            children={this.state.currencies.map(item => {
              return (
                <Picker.Item
                  key={generateId()}
                  label={item.Name}
                  value={item.CurrencyId}
                />
              );
            })}
          />
        </View>

        <View style={{ padding: 25 }}>
          <Text>Group</Text>
          <Picker
            selectedValue={this.state.groupId}
            onValueChange={val => {
              this.setState({
                groupId: val
              });
            }}
            children={this.state.groups.map(item => {
              return (
                <Picker.Item
                  key={generateId()}
                  label={item.Name}
                  value={item.GroupId}
                />
              );
            })}
          />
        </View>

        <View style={{ padding: 25 }}>
          <TextInput
            mode="outlined"
            label="Name"
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <NumericInput
            label="Start amount"
            value={this.state.startAmount}
            onChange={val => this.setState({ startAmount: val })}
          />
        </View>

        <Button
          mode="contained"
          loading={this.state.loading}
          onPress={this.onSubmitClick}
        >
          Submit
        </Button>

        <Toast ref="toast" />
      </View>
    );
  }

  onSubmitClick = async () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      try {
        await createAccount(this.state);
        this.setState({ loading: false });
        this.refs.toast.show("Account created.");

        setTimeout(async () => {
          this.props.navigation.pop();
        }, 1000);
      } catch (e) {
        this.refs.toast.show("Invalid data provided.");
        this.setState({ loading: false });
      }
    }, 1000);
  };
}

export default NewAccountScreen;
