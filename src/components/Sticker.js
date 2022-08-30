import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

class StickerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.figu);
    return (
      <View style={styles.sticker}>
        <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{ uri: this.props.figu.image.uri }}
          reziseMode="contain"
          />
          <Text style={styles.number}>{this.props.figu.number}</Text>
          </View>
        <View style={styles.textInfo}>
          <Text style={styles.country}>{this.props.figu.lable}</Text>
          <TouchableOpacity
            style={styles.trash}
            onPress={() => this.props.delete(this.props.figu)}
          >
            <AntDesign
              style={styles.icon}
              color="red"
              name="delete"
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sticker: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "row",
    borderTopColor: "rgb(220,220,220)",
    borderTopWidth: "1px",
    borderBottomColor: "rgb(220,220,220)",
    borderBottomWidth: "1px",
    // backgroundColor: 'rgb(220,220,220)',
    paddingVertical: 12,
    alignItems: "center",
  },
  imgContainer: {
    position: "relative"
  },
  image: {
    height: 50,
    width: 50,
  },
  number: {
    height: 50,
    width: 50,
    position: "absolute",
    zIndex: 3,
    backgroundColor: "rgba(40, 40, 40, 0.7)",
    borderRadius: '50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: 'white',
    fontWeight: 'bolder'
  },
  textInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "77%",
    marginLeft: 13,

  },
  country: {
    fontSize: 18
  },
  trash: {

  },
});

export default StickerList;
