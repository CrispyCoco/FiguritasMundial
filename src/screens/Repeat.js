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

const local_data = [
  {
    value: "1",
    lable: "QAT",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/qatar.png?alt=media&token=55b3af02-ba03-4035-9a2e-526aed1ea3c5",
    },
  },
  {
    value: "2",
    lable: "ECU",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/ecuador.png?alt=media&token=84e88e23-18d2-40e0-ad99-ea46e91d4fa2",
    },
  },
  {
    value: "3",
    lable: "SEN",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/senegal.png?alt=media&token=0c1ddd81-bd3b-47f3-962e-762e108a94fb",
    },
  },
  {
    value: "4",
    lable: "NED",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/netherlands.png?alt=media&token=3e6569e5-614b-4f12-b582-56b474e460b3",
    },
  },
  {
    value: "5",
    lable: "ENG",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/england.png?alt=media&token=840d4865-ef55-42e0-b8f2-75256efb75b5",
    },
  },
  {
    value: "6",
    lable: "IRN",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/iran.png?alt=media&token=b1814e51-5c6d-43d3-b862-1509641a039e",
    },
  },
  {
    value: "7",
    lable: "USA",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/united-states.png?alt=media&token=65c6a794-31cf-43e4-b836-4cf3bc72f4eb",
    },
  },
  {
    value: "8",
    lable: "WAL",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/wales.png?alt=media&token=0932eaba-c60b-4406-9df3-2fba6167d46a",
    },
  },
  {
    value: "9",
    lable: "ARG",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/argentina.png?alt=media&token=57dd64bb-866a-4da6-b7bc-b90f08735b05",
    },
  },
  {
    value: "10",
    lable: "KSA",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/saudi-arabia.png?alt=media&token=3aa6e9b8-0c75-44e3-b9fd-86f2b6dccd70",
    },
  },
  {
    value: "11",
    lable: "MEX",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/mexico.png?alt=media&token=5e557876-3a7e-40bd-b65a-c2ca27333fea",
    },
  },
  {
    value: "12",
    lable: "POL",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/poland.png?alt=media&token=2b8984cb-195e-4475-bcaa-69e14cb77856",
    },
  },
  {
    value: "13",
    lable: "FRA",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/france.png?alt=media&token=a92356a6-81e0-49ab-b00e-7e34122f74a8",
    },
  },
  {
    value: "14",
    lable: "AUS",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/australia.png?alt=media&token=5f66ecb9-8cea-46fb-a306-cc404ab26315",
    },
  },
  {
    value: "15",
    lable: "DEN",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/denmark.png?alt=media&token=54d1c65c-263c-437e-80e0-0b3ef03f2e7c",
    },
  },
  {
    value: "16",
    lable: "TUN",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/tunisia.png?alt=media&token=ab7989c5-daa4-4de7-9154-438b497ff347",
    },
  },
  {
    value: "17",
    lable: "ESP",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/spain.png?alt=media&token=785b62e9-aebb-41ca-b988-465123d92ff6",
    },
  },
  {
    value: "18",
    lable: "CRC",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/costa-rica.png?alt=media&token=0c501792-f639-4d08-84f4-803e24ac7f55",
    },
  },
  {
    value: "19",
    lable: "GER",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/germany.png?alt=media&token=4839896e-987a-4411-9a00-03bf6374e231",
    },
  },
  {
    value: "20",
    lable: "JPN",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/japan.png?alt=media&token=c9241a74-3c79-42c4-acdc-f8188d506246",
    },
  },
  {
    value: "21",
    lable: "BEL",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/belgium.png?alt=media&token=94220536-a741-4b1e-b1e1-7497bb58166b",
    },
  },
  {
    value: "22",
    lable: "CAN",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/canada.png?alt=media&token=1711980c-43d2-4a10-964b-6cbd4a461467",
    },
  },
  {
    value: "23",
    lable: "MAR",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/morocco.png?alt=media&token=0a4c5281-f5f0-4d0a-b324-ef75fe274b17",
    },
  },
  {
    value: "24",
    lable: "CRO",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/croatia.png?alt=media&token=ce817a77-8fca-47d9-b487-eb48a600a74e",
    },
  },
  {
    value: "25",
    lable: "BRA",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/brazil.png?alt=media&token=3a693e76-4e6f-40ec-8c8e-095f8e82d116",
    },
  },
  {
    value: "26",
    lable: "SRB",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/serbia.png?alt=media&token=41a74d62-e7cb-483a-b437-60f90b17ae56",
    },
  },
  {
    value: "27",
    lable: "SUI",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/switzerland.png?alt=media&token=3e72cc6a-4c0b-48b6-9d7e-dbdae5b50602",
    },
  },
  {
    value: "28",
    lable: "CMR",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/cameroon.png?alt=media&token=7c9ecd23-5648-4fa4-bb07-515c697f4af3",
    },
  },
  {
    value: "29",
    lable: "POR",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/portugal.png?alt=media&token=96726abf-7d5a-4e12-8e03-19f090e3d335",
    },
  },
  {
    value: "30",
    lable: "GHA",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/ghana.png?alt=media&token=3067f2e2-610f-4469-8645-dd9c485218b1",
    },
  },
  {
    value: "31",
    lable: "URU",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/uruguay.png?alt=media&token=c061411b-4538-4af3-b176-f23551b8fefd",
    },
  },
  {
    value: "32",
    lable: "KOR",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/south-korea.png?alt=media&token=8879b1e5-a5d6-4dfe-bf8f-8497c8ee216d",
    },
  },
  {
    value: "33",
    lable: "FWC",
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/figuritasmundial-f6159.appspot.com/o/world-cup.png?alt=media&token=2f4a6ed0-bb70-47dd-8575-da358d93b280",
    },
  },
];
const data = [
  { label: "00", value: "00" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
];
class Repeat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      figus: "",
      repeat: "",
      modal: false,
      error: "",
      owned:''
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

        this.setState({ figus: figus, repeat: figus.data.repeat, owned: figus.data.owned });
      });
  }
  addToList(countryDb, number) {
    let newFigu = countryDb;
    newFigu.number = number;
    newFigu.id = this.state.repeat.length;
    if (newFigu.number == 0 || newFigu.number > 19) {
      if (newFigu.lable != "FWC") {
        this.setState({ error: "No existe esa figurita" });
      }
      return;
    }
    if(!this.state.owned.includes(newFigu)){
        this.setState({error: 'No tenes esa figurita'})
        return
    }
    db.collection("figus")
      .doc(this.state.figus.id)
      .update({
        repeat: firebase.firestore.FieldValue.arrayUnion(newFigu),
      })
      .then(() => this.setState({ country: "", countryDb: "", number: "", error: '' }));
  }
  showModal() {
    this.setState({ modal: !this.state.modal, error: "" });
  }
  delete(figu) {
    db.collection("figus")
      .doc(this.state.figus.id)
      .update({
        repeat: firebase.firestore.FieldValue.arrayRemove(figu),
      })
      .then(() => console.log("done"));
  }
  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <View style={styles.header}>
          <Text style={styles.title}>Mis Repetidas</Text>
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
            data={this.state.repeat}
            keyExtractor={(figu) => figu.value}
            renderItem={({ item }) => <Sticker figu={item} delete={(figu)=>this.delete(figu)}/>}
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
export default Repeat;
