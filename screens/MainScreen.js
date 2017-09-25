import React, { Component } from "react";
import { View, Button, StyleSheet, TouchableHighlight, Text, BackHandler } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#D3D3D3",
    alignItems: "center"
  },
  textStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: "Contacts",
    headerStyle: { paddingTop: 20 }
  };

  createButton = (title, navigateScreen, screen) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigate(navigateScreen, { screen: screen })}
      >
        <Text style={styles.textStyle}> {title} </Text>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.createButton("Create Contact", "NewContacts", "create")}
        {this.createButton("Edit Contact", "ContactsList", "edit")}
        {this.createButton("Delete Contact", "ContactsList", "delete")}
        {this.createButton("Display Contact", "ContactsList", "display")}
        <TouchableHighlight style={styles.button} onPress={() => BackHandler.exitApp()}>
          <Text style={styles.textStyle}> Finish </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
