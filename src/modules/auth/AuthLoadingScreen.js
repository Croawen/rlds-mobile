import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { main } from "../../styles/container";
import { getCurrentUser } from "../../common/storage";

class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    await this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate((await getCurrentUser()) ? "App" : "Login");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={main.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(AuthLoadingScreen);
