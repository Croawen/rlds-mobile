import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

class LoadingIndicator extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, padding: 25 }}>
        <ActivityIndicator animating={true} color={"#6200ee"} size="large" />
      </View>
    );
  }
}

export default LoadingIndicator;
