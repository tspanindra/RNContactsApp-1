import React from "react";
import { View, Text, StyleSheet, Linking, TouchableHighlight } from "react-native";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  rowContainer: {
    paddingTop: 10,
    flexDirection: "row"
  },
  textStyle: {
    textDecorationLine: "underline",
    color: "#0000EE"
  }
});

export const mapStateToProps = (state: Object) => {
  return {
    contacts: state.myContacts.contacts
  };
};

export class DisplayList extends React.Component {
  constructor() {
    super();
    this.state = {
      facebookProfileUrl: "",
      twitterProfileUrl: "",
      skype: "",
      youtubeChannel: ""
    };
  }

  componentWillMount() {
    const { state } = this.props.navigation;

    const selectedContact = this.props.contacts.filter(contact => {
      if (contact.first === state.params.first) {
        return contact;
      }
    });
    // this.setState(selectedContact[0]);
    this.setState({
      facebookProfileUrl: selectedContact[0].facebookProfileUrl,
      twitterProfileUrl: selectedContact[0].twitterProfileUrl,
      skype: selectedContact[0].skype,
      youtubeChannel: selectedContact[0].youtubeChannel
    });
  }

  handleOnPress = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };

  fetchUrl = (text, link) => {
    return (
      <TouchableHighlight style={styles.rowContainer} onPress={() => this.handleOnPress(link)}>
        <Text style={styles.textStyle}> {text} </Text>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.facebookProfileUrl != "" &&
          this.fetchUrl("Facebook Profile Url", this.state.facebookProfileUrl)}

        {this.state.twitterProfileUrl != "" &&
          this.fetchUrl("Twitter Profile Url", this.state.twitterProfileUrl)}

        {this.state.skype != "" && this.fetchUrl("Skype", this.state.skype)}

        {this.state.youtubeChannel != "" &&
          this.fetchUrl("Youtube Channel", this.state.youtubeChannel)}
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(DisplayList);
