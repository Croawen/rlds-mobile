import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, DataTable } from "react-native-paper";
import { getTransactions } from "../../../../common/api/transactions.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";

class TransactionsListScreen extends React.Component {
  state = {
    isVisible: false,
    items: null,
    pageNumber: 0,
    pageSize: 10,
    pageCount: 0
  };

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.getTransactions(0);
    });
  }

  async getTransactions(pageNumber) {
    try {
      const res = await getTransactions(pageNumber);
      this.setState({
        isVisible: true,
        items: res.items,
        pageNumber: res.pager.pageNumber,
        pageSize: res.pager.pageSize,
        pageCount: res.pager.pageCount
      });
    } catch (e) {}
  }

  getPageLabel() {
    return `${this.state.pageNumber + 1} of ${this.state.pageCount}`;
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
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title>Date</DataTable.Title>
                  <DataTable.Title numeric>Source Change</DataTable.Title>
                  <DataTable.Title numeric>Target Change</DataTable.Title>
                </DataTable.Header>

                {this.state.items.map(item => {
                  return (
                    <DataTable.Row
                      key={item.id}
                      onPress={() => {
                        this.setState({ isVisible: false });
                        this.props.navigation.navigate("TransactionDetails", {
                          id: item.id
                        });
                      }}
                    >
                      <DataTable.Cell>{item.title}</DataTable.Cell>
                      <DataTable.Cell>
                        {new Date(item.createdAt).toISOString()}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {item.sourceChange}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {item.targetChange}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}

                <DataTable.Pagination
                  page={this.state.pageNumber}
                  numberOfPages={this.state.pageCount}
                  onPageChange={page => {
                    this.getTransactions(page);
                  }}
                  label={this.getPageLabel()}
                />
              </DataTable>
            </Card>
          </ScrollView>
        )}

        {!this.state.isVisible && <LoadingIndicator />}

        <Button
          mode="contained"
          loading={false}
          onPress={() => {
            this.setState({ isVisible: false });
            this.props.navigation.navigate("NewTransaction");
          }}
        >
          Create a transaction
        </Button>
      </View>
    );
  }

  onItemClick = async transactionId => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate("TransactionDetails", { id: transactionId });
  };
}

export default TransactionsListScreen;
