import React from "react";
import { View, Picker } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import generateId from "../../../../common/helpers/generateId";
import NumericInput from "../../../../common/components/NumericInput";
import { createGroup } from "../../../../common/api/groups.api";
import Toast, { DURATION } from "react-native-easy-toast";

class NewGroupScreen extends React.Component {
  state = {
    name: "",
    info: "",
    ordinal: ""
  };

  async componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, marginTop: -64 }}>
        <View style={{ padding: 25 }}>
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
            label="Info"
            value={this.state.info}
            multiline={true}
            onChangeText={text => this.setState({ info: text })}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <NumericInput
            label="Ordinal"
            value={this.state.ordinal}
            onChange={val => this.setState({ ordinal: val })}
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
        await createGroup(this.state);
        this.setState({ loading: false });
        this.refs.toast.show("Group created.");

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

export default NewGroupScreen;
