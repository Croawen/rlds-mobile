import React from "react";
import { Picker, ScrollView, View } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, Text, TextInput } from "react-native-paper";
import { createAccount } from "../../../../common/api/accounts.api";
import { getGroups } from "../../../../common/api/groups.api";
import NumericInput from "../../../../common/components/NumericInput";
import generateId from "../../../../common/helpers/generateId";

const currencies = { PLN: "PLN", USD: "USD", GBP: "GBP", EUR: "EUR" };

class NewAccountScreen extends React.Component {
  state = {
    groups: [],
    groupId: "",
    currency: "",
    description: "",
    name: "",
    balance: 0
  };

  async componentDidMount() {
    const groups = await getGroups();
    if (groups) {
      this.setState({
        groups: groups.items,
        currency: currencies.USD,
        groupId: groups.items[0].id
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 25 }}>
            <Text>Currency</Text>
            <Picker
              selectedValue={this.state.currency}
              onValueChange={val => {
                this.setState({
                  currency: val
                });
              }}
              children={Object.keys(currencies).map(item => {
                return (
                  <Picker.Item
                    key={generateId()}
                    label={item}
                    value={currencies[item]}
                  />
                );
              })}
            />
          </View>

          <View style={{ paddingHorizontal: 25 }}>
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
                    label={item.name}
                    value={item.id}
                  />
                );
              })}
            />
          </View>

          <View style={{ padding: 25, paddingTop: 0 }}>
            <TextInput
              mode="outlined"
              label="Name"
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
          </View>

          <View style={{ padding: 25, paddingTop: 0 }}>
            <TextInput
              mode="outlined"
              label="Description"
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
            />
          </View>

          <View style={{ padding: 25, paddingTop: 0 }}>
            <NumericInput
              label="Balance"
              value={this.state.balance}
              onChange={val => this.setState({ balance: val })}
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
      </ScrollView>
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
        switch (e.statusCode) {
          case 400:
            this.refs.toast.show("Invalid data provided.");
            break;
          case 460:
            this.refs.toast.show("Account with this name already exists.");
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

export default NewAccountScreen;
