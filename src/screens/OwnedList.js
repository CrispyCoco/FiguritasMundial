import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

import Sticker from "../components/Sticker";
import MyModal from "../components/MyModal";

import { db, auth } from "../firebase/config";
import firebase from "firebase";

import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

class OwnedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      figus: "",
      modal: false,
      owned: "",
      error: ''
    };
  }
  componentDidMount() {
    db.collection("figus")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let figus = [];
        docs.forEach((doc) => {
          figus.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        figus.forEach((fig) => {
          figus = fig;
        });

        this.setState({ figus: figus, owned: figus.data.owned });
      });
  }
  addToList(countryDb, number) {
    let newFigu = countryDb;
    newFigu.number = number;
    let late = false
    if(newFigu.number == 0 || newFigu.number > 19){
        if (newFigu.lable != 'FWC') {
            this.setState({error: 'No existe esa figurita'})
        }
        return
    }
    this.state.owned.forEach((element) => {
      if (element.lable == newFigu.lable && element.number == newFigu.number) {
        late = true;
      }
    });
    if (late) {
      this.setState({ error: "Ya tenés esa figurita" });
    } else {
        this.setState({error: ''})
      newFigu.id = this.state.owned.length;
      db.collection("figus")
        .doc(this.state.figus.id)
        .update({
          owned: firebase.firestore.FieldValue.arrayUnion(newFigu),
        })
        .then(() => console.log("done"));
    }
  }
  showModal() {
    this.setState({ modal: !this.state.modal, error: '' });
  }
  delete(figu) {
    db.collection("figus")
      .doc(this.state.figus.id)
      .update({
        owned: firebase.firestore.FieldValue.arrayRemove(figu),
      })
      .then(() => console.log("done"));
  }
  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <View style={styles.header}>
          <Text style={styles.title}>Mis Figuritas</Text>
          <TouchableOpacity
            onPress={() => this.showModal()}
            style={styles.addButton}
          >
            <AntDesign
              style={styles.icon}
              color="white"
              name="plus"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modal}
        >
          <MyModal
            showModal={() => this.showModal()}
            addToList={(countryDb, number) => this.addToList(countryDb, number)}
            error={this.state.error}
          />
        </Modal>
        <ScrollView contentContainerStyle={styles.stickerList}>
          <FlatList
            data={this.state.owned}
            keyExtractor={(figu) => figu.value}
            renderItem={({ item }) => (
              <Sticker figu={item} delete={(figu) => this.delete(figu)} />
            )}
            nestedScrollEnabled={true}
            style={styles.flatlist}
            // contentContainerStyle={styles.items}
          />
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(98,7,35)",
    minHeight: 35,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 18,
  },
  addButton: {
    marginVertical: 7,
    marginRight: 18,
    border: "1px solid rgba(220,220,220,0.2)",
    padding: 5,
  },
  drops: {
    display: "flex",
    flexDirection: "row",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
  dropdown: {
    margin: 16,
    height: 45,
    width: 120,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    borderColor: "rgba(128, 128, 128, 0.2)",
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "rgb(237,185,41)",
    width: 90,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 18,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  stickerList: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  flatlist: {
    width: "95%",
    marginTop: 30,
  },
});

export default OwnedList;

{/* <TouchableOpacity onPress={()=>this.props.logout()}>
            <Text>Logout</Text>
        </TouchableOpacity> */}