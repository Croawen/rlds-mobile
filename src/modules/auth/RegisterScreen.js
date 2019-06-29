import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { register } from "../../common/api/auth.api";
import Toast, { DURATION } from "react-native-easy-toast";

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: "Create a new account"
  };

  state = {
    login: "",
    password: "",
    email: "",
    loading: false
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toast ref="toast" />
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
            label="Email"
            value={this.state.register}
            onChangeText={text => this.setState({ email: text })}
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
          icon="add-a-photo"
          mode="contained"
          loading={this.state.loading}
          onPress={this.onRegisterClick}
        >
          Register
        </Button>

        <Button
          mode="outline"
          loading={false}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          Already have an account?
        </Button>

        <Toast ref="toast" />
      </View>
    );
  }

  onRegisterClick = async () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      try {
        const res = await register({
          login: this.state.login,
          password: this.state.password,
          email: this.state.email
        });

        this.setState({ loading: false });
        if (res) {
          this.props.navigation.navigate("Login");
        }
      } catch (e) {
        this.setState({ loading: false });
        this.refs.toast.show("Invalid register attempt.");
      }
    }, 1000);
  };
}

export default connect(
  state => ({}),
  dispatch => ({})
)(RegisterScreen);
