import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Card, List } from "react-native-paper";
import generateId from "../../../../common/helpers/generateId";
import { getGroups } from "../../../../common/api/groups.api";

class GroupsListScreen extends React.Component {
  state = {
    isVisible: false,
    items: null,
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0
  };

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.getGroups();
    });
  }

  async getGroups() {
    const res = await getGroups();
    this.setState({
      isVisible: true,
      items: res.Items,
      pageNumber: res.PageNumber,
      pageSize: res.PageSize,
      pageCount: res.PageCount
    });
  }

  render() {
    return this.state.isVisible ? (
      <ScrollView pagingEnabled={true}>
        <View style={{ flex: 1 }}>
          <Card style={{ flex: 1 }}>
            {this.state.items &&
              this.state.items.map(item => {
                return (
                  <List.Item
                    key={generateId()}
                    title={item.Name}
                    description={item.Info}
                    onPress={() => this.onItemClick(item.GroupId)}
                    left={props => <List.Icon {...props} icon="folder" />}
                  />
                );
              })}
          </Card>

          <Button
            mode="contained"
            loading={false}
            onPress={() => {
              this.setState({ isVisible: false });
              this.props.navigation.navigate("NewGroup");
            }}
          >
            Create a group
          </Button>
        </View>
      </ScrollView>
    ) : null;
  }

  onItemClick = async groupId => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate("GroupDetails", { id: groupId });
  };
}

export default GroupsListScreen;
