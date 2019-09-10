import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput } from "react-native-paper";
import { getTransaction } from "../../../../common/api/transactions.api";
import LoadingIndicator from "../../../../common/components/LoadingIndicator";

class TransactionDetailsScreem extends React.Component {
  state = {
    transaction: null
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam("id");
    await this.getTransaction(id);
  }

  async getTransaction(transactionId) {
    try {
      const transaction = await getTransaction(transactionId);
      this.setState({
        transaction
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderForm() {
    const transaction = this.state.transaction;
    if (!transaction) {
      return null;
    }

    return (
      <View>
        <ScrollView>
          <Card>
            <Card.Title
              title="Transaction Details"
              subtitle="View information about this transaction"
            />
            <Card.Content>
              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Title"
                  value={transaction.title}
                  disabled={true}
                  editable={false}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Date"
                  disabled={true}
                  editable={false}
                  value={new Date(transaction.createdAt).toISOString()}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Category"
                  disabled={true}
                  editable={false}
                  value={transaction.category}
                />
              </View>

              <View style={{ padding: 12, paddingTop: 0 }}>
                <TextInput
                  mode="outlined"
                  label="Type"
                  disabled={true}
                  editable={false}
                  value={transaction.type}
                />
              </View>

              {(transaction.type === "WITHDRAW" ||
                transaction.type === "TRANSFER") && (
                <View>
                  <View style={{ padding: 12, paddingTop: 0 }}>
                    <TextInput
                      mode="outlined"
                      label="Source account"
                      disabled={true}
                      editable={false}
                      value={transaction.sourceAccount}
                    />
                  </View>

                  <View style={{ padding: 12, paddingTop: 0 }}>
                    <TextInput
                      mode="outlined"
                      label="Source change"
                      disabled={true}
                      editable={false}
                      value={transaction.sourceChange.toString()}
                    />
                  </View>
                </View>
              )}

              {(transaction.type === "DEPOSIT" ||
                transaction.type === "TRANSFER") && (
                <View>
                  <View style={{ padding: 12, paddingTop: 0 }}>
                    <TextInput
                      mode="outlined"
                      label="Target account"
                      disabled={true}
                      editable={false}
                      value={transaction.targetAccount}
                    />
                  </View>

                  <View style={{ padding: 12, paddingTop: 0 }}>
                    <TextInput
                      mode="outlined"
                      label="Target change"
                      disabled={true}
                      editable={false}
                      value={transaction.targetChange.toString()}
                    />
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }

  render() {
    return this.state.transaction ? this.renderForm() : <LoadingIndicator />;
  }
}

export default TransactionDetailsScreem;
