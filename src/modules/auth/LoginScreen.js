import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import Toast, { DURATION } from "react-native-easy-toast";

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  state = {
    login: "",
    password: "",
    loading: false
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 25 }}>
          <TextInput
            mode="outlined"
            label="Login"
            value={this.state.login}
            onChangeText={text => this.setState({ login: text })}
          />
        </View>

        <View style={{ padding: 25, paddingTop: 0 }}>
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <Button
          mode="contained"
          loading={this.state.loading}
          onPress={this.onLoginClick}
        >
          Log in
        </Button>

        <Button
          mode="outline"
          loading={false}
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        >
          Create an account
        </Button>

        <Toast ref="toast" />
      </View>
    );
  }

  onLoginClick = async () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      try {
        const res = await this.props.logIn({
          login: this.state.login,
          password: this.state.password
        });

        this.setState({ loading: false });
        if (res) {
          this.props.navigation.navigate("App");
        }
      } catch (e) {
        this.setState({ loading: false });
        this.refs.toast.show("Invalid login attempt.");
      }
    }, 1000);
  };
}

onRegisterClick = () => {
  this.props.navigation.navigate("Register");
};

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    logIn: ({ login, password }) =>
      dispatch.currentUser.logIn({ login, password })
  })
)(LoginScreen);
