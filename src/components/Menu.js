import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Drawer = createBottomTabNavigator();
import { auth, db } from "../firebase/config";
import Icon from "react-native-vector-icons/AntDesign";

import OwnedList from "../screens/OwnedList";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Search from "../screens/Search";
import Repeat from "../screens/Repeat";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
      loaded: false,
      error: "",
      countries: [],
    };
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          user: user,
        });
      }
      this.setState({
        loaded: true,
      });
    });
  }
  register(email, pass, username, url) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        
        console.log(auth.currentUser);
        db.collection("figus").add({
          owner: auth.currentUser.email,
          owned: [],
          repeat: []
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  login(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        this.setState({
          loggedIn: true,
          user: response.user,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        loggedIn: false,
        user: null,
      });
    });
  }
  render() {
    return this.state.loaded ? (
      <View style={{ width: "100%", flex: 1 }}>
        <NavigationContainer>
          {!this.state.loggedIn ? (
            <Drawer.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
                headerShown: false,
              })}
              tabBarOptions={{
                activeBackgroundColor: "rgb(98,7,35)",
                inactiveBackgroundColor: "white",
                activeTintColor: "white",
                inactiveTintColor: "rgb(98,7,35)"
                // showLabel: false,
              }}
            >
              
              <Drawer.Screen
                name="Login"
                component={() => (
                  <Login
                    login={(email, password) => this.login(email, password)}
                    error={this.state.error}
                  />
                )}
              />
              <Drawer.Screen
                name="Register"
                component={() => (
                  <Register
                    register={(email, password, username, url) =>
                      this.register(email, password, username, url)
                    }
                    error={this.state.error}
                  />
                )}
              />
            </Drawer.Navigator>
          ) : (
            <Drawer.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
                headerShown: false,
              })}
              tabBarOptions={{
                activeBackgroundColor: "rgb(98,7,35)",
                inactiveBackgroundColor: "white",
                activeTintColor: "white",
                inactiveTintColor: "rgb(98,7,35)"
                // showLabel: false,
              }}
            >
              <Drawer.Screen name="LaTe" component={() => <OwnedList logout={()=>this.logout()} />} />
              <Drawer.Screen name="Buscar" component={() => <Search />} />
              <Drawer.Screen name="Repe" component={() => <Repeat />} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </View>
    ) : (
      <Text></Text>
    );
  }
}

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "LaTe":
      iconName = "check";
      break;
    case "Repe":
      iconName = "reload1";
      break;
    case "Add Post":
      iconName = "plus";
      break;
    case "Login":
      iconName = "lock";
      break;
    case "Buscar":
      iconName = "search1";
      break;
    case "Register":
      iconName = "adduser";
      break;
    // default:
    //   break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const styles = StyleSheet.create({
  drawer: {
    color: "red",
  },
});
export default Menu;
