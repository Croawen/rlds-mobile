import React from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, TextInput } from "react-native-paper";
import { createGroup } from "../../../../common/api/groups.api";

class NewGroupScreen extends React.Component {
  state = {
    name: "",
    description: ""
  };

  async componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
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
            label="Description"
            value={this.state.description}
            multiline={true}
            onChangeText={text => this.setState({ description: text })}
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
        switch (e.statusCode) {
          case 400:
            this.refs.toast.show("Invalid data provided.");
            break;
          case 460:
            this.refs.toast.show("Group with this name already exists.");
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

export default NewGroupScreen;
