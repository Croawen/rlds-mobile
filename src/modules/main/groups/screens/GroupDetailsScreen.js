import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { getGroup } from "../../../../common/api/groups.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";

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
    } catch (e) {
      console.log(e);
    }
  }

  renderForm() {
    const group = this.state.group;
    if (!group) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 25 }}>
          <TextInput
            mode="outlined"
            label="Name"
            editable={false}
            disabled={true}
            value={group.name}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Description"
            editable={false}
            disabled={true}
            value={group.description}
            multiline={true}
          />
        </View>
      </View>
    );
  }

  render() {
    return this.state.group ? this.renderForm() : <LoadingIndicator />;
  }
}

export default GroupDetailsScreen;
