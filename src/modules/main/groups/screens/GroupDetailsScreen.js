import React from "react";
import { View } from "react-native";
import { getGroup } from "../../../../common/api/groups.api";
import { TextInput } from "react-native-paper";

class GroupDetailsScreen extends React.Component {
  state = {
    group: null
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam("id");
    await this.getGroup(id);
  }

  async getGroup(groupId) {
    try {
      const group = await getGroup(groupId);

      this.setState({
        group
      });
    } catch (e) {}
  }

  render() {
    const group = this.state.group;
    if (!group) {
      return null;
    }

    return (
      <View style={{ flex: 1, marginTop: -64 }}>
        <View style={{ padding: 25 }}>
          <TextInput
            mode="outlined"
            label="Name"
            editable={false}
            value={group.Name}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Info"
            editable={false}
            value={group.Info}
            multiline={true}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Ordinal"
            editable={false}
            value={group.Ordinal ? group.Ordinal.toString() : "0"}
          />
        </View>
      </View>
    );
  }
}

export default GroupDetailsScreen;
