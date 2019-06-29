import React from "react";
import { View, Image, Text, Platform, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation";

class SideMenu extends React.Component {
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/* <Image
          source={{
            uri:
              "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg"
          }}
          style={styles.sideMenuProfileIcon}
        /> */}

        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#e2e2e2",
            marginTop: 15
          }}
        />

        <View
          style={{
            width: "100%"
          }}
        >
          <DrawerItems {...this.props}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Image
                source={{
                  uri:
                    "https://reactnativecode.com/wp-content/uploads/2018/08/social.jpg"
                }}
                style={styles.sideMenuIcon}
              />

              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.push("Accounts");
                }}
              >
                {" "}
                Accounts{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Image
                source={{
                  uri:
                    "https://reactnativecode.com/wp-content/uploads/2018/08/social.jpg"
                }}
                style={styles.sideMenuIcon}
              />

              <Text
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.push("Transactions");
                  console.log(this.props.navigation);
                }}
              >
                {" "}
                Transactions{" "}
              </Text>
            </View>
          </DrawerItems>
        </View>

        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#e2e2e2",
            marginTop: 15
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    alignItems: "center",
    justifyContent: "center"
  },

  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20
  },

  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },

  sideMenuIcon: {
    resizeMode: "center",
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 20
  },

  menuText: {
    fontSize: 15,
    color: "#222222"
  }
});

export default SideMenu;
