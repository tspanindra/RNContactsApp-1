import React, { Component } from "react";
import { FlatList, Text, StyleSheet, View, Image, TouchableHighlight, Alert } from "react-native";
import { connect } from "react-redux";
import default_pic from "../assets/default_pic.png";
import * as appActions from "../state/actions";
import { bindActionCreators } from "redux";

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexDirection: "row"
  },
  container: {
    flexDirection: "column"
  },
  nameContainer: {
    flexDirection: "row"
  },
  noContact: {
    paddingTop: 10,
    alignSelf: "center",
    justifyContent: "center"
  },
  textStyle: {
    paddingLeft: 10
  },
  divider: {
    height: 1,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    backgroundColor: "#CED0CE"
  }
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      ...appActions
    },
    dispatch
  );

export const mapStateToProps = (state: Object) => {
  return {
    contacts: state.myContacts.contacts
  };
};

export class ContactsList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Contacts List",
    headerStyle: { paddingTop: 30 }
  });

  getTextInput = title => {
    return <TextInput style={styles.textStyle} placeholder={title} />;
  };

  keyExtractor = (item, index) => item.first;

  handleRow = item => {
    const { state, navigate } = this.props.navigation;
    switch (state.params.screen) {
      case "edit": {
        navigate("NewContacts", { screen: "edit", first: item.first });
        return;
      }
      case "delete": {
        Alert.alert(
          "Contacts Delete",
          "Are you sure want to delete ?",
          [
            { text: "No", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
            { text: "Yes", onPress: () => this.props.deleteContact(item.first) }
          ],
          { cancelable: false }
        );
      }
      case "display": {
        navigate("DisplayList", { first: item.first });
        return;
      }
    }
  };
  renderItem = ({ item }) => {
    return (
      <TouchableHighlight onPress={() => this.handleRow(item)}>
        <View style={styles.mainContainer}>
          <Image style={{ width: 40, height: 40 }} source={default_pic} />
          <View style={styles.container}>
            <View style={styles.nameContainer}>
              <Text style={styles.textStyle}>{item.first}</Text>
              <Text style={styles.textStyle}>{item.last}</Text>
            </View>
            <Text style={styles.textStyle}>{item.phone}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  renderSeparator = () => {
    return <View style={styles.divider} />;
  };
  render() {
    if (this.props.contacts.length < 1) {
      return <Text style={styles.noContact}> Sorry you have No contacts! </Text>;
    }
    return (
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data={this.props.contacts}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
