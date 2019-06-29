import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

class HamburgerIcon extends React.Component {
  toggleDrawer = () => {
    if (!this.props.navigationProps.pop()) {
      this.props.navigationProps.toggleDrawer();
    }
  };

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={{
              uri:
                "https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png"
            }}
            style={{ width: 25, height: 25, marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HamburgerIcon;
