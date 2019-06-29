import React from "react";
import { View } from "react-native";
import { TextInput, Button, Card, List } from "react-native-paper";
import { getAccounts } from "../../../../common/api/accounts.api";
import generateId from "../../../../common/helpers/generateId";
class TransactionsListScreen extends React.Component {
  state = {
    items: null,
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0
  };

  async componentDidMount() {}

  render() {
    return (
      <View>
        <Card>
          {this.state.items &&
            this.state.items.map(item => {
              return (
                <List.Item
                  id={generateId()}
                  title={item.Name}
                  description="Item description"
                  left={props => <List.Icon {...props} icon="folder" />}
                />
              );
            })}
        </Card>
      </View>
    );
  }
}

export default TransactionsListScreen;
