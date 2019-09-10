import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, List } from "react-native-paper";
import { getGroups } from "../../../../common/api/groups.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";
import generateId from "../../../../common/helpers/generateId";

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
    try {
      const res = await getGroups();
      this.setState({
        isVisible: true,
        items: res.items,
        pageNumber: res.pager.pageNumber,
        pageSize: res.pager.pageSize,
        pageCount: res.pager.pageCount
      });
    } catch (e) {}
  }

  render() {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        {this.state.items && (
          <ScrollView pagingEnabled={true}>
            <Card style={{ flex: 1 }}>
              {this.state.items.map(item => {
                return (
                  <List.Item
                    key={generateId()}
                    title={item.name}
                    description={item.description}
                    onPress={() => this.onItemClick(item)}
                    left={props => (
                      <List.Icon {...props} icon="accessibility" />
                    )}
                  />
                );
              })}
            </Card>
          </ScrollView>
        )}

        {!this.state.isVisible && <LoadingIndicator />}

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
    );
  }

  onItemClick = async group => {
    if (group.editable) {
      this.setState({ isVisible: false });
      this.props.navigation.navigate("GroupDetails", { id: group.id });
    }
  };
}

export default GroupsListScreen;
