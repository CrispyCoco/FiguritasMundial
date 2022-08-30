import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  render() {
    return (
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require("../../assets/Privacy policy-rafiki.svg")}
          reziseMode="contain"
        />
        <View style={styles.viewInputs}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder="Email"
            keyboardType="email-address"
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Password"
            keyboardType="default"
            value={this.state.password}
            secureTextEntry={true}
          />
          <Text style={styles.textError}>{this.props.error}</Text>
          <TouchableOpacity
            style={
              this.state.email.length == 0 || this.state.password.length < 6
                ? styles.buttonD
                : styles.button
            }
            disabled={
              this.state.email.length == 0 || this.state.password.length < 6
                ? true
                : false
            }
            onPress={() =>
              this.props.login(this.state.email, this.state.password)
            }
          >
            <Text style={styles.textButton}> Iniciar Sesión </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'rgb(12, 11, 14)',
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    height: 150,
    width: 150,
  },
  viewInputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    marginBottom: 15

  },
  input: {
    width: "80%",
    border: "1px solid gray",
    borderRadius: "10px",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 4,
    // backgroundColor: 'white',
    color: "light-gray",
    outlineStyle: "none",
  },
  button: {
    width: "80%",
    backgroundColor: "rgb(237,185,41)",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: "none",
  },
  textButton: {
    color: "white",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  buttonD: {
    width: "80%",
    backgroundColor: "gray",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: "none",
  },
  textError: {
    color: "red",
  },
});
export default login;
