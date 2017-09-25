import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  DatePickerIOS,
  DatePickerAndroid
} from "react-native";
import profilePic from "../assets/profile_pic.jpeg";
import { connect } from "react-redux";
import * as appActions from "../state/actions";
import { bindActionCreators } from "redux";
import DatePicker from "react-native-datepicker";
// import Toast from "react-native-simple-toast";

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
    backgroundColor: "gray",
    alignItems: "center"
  },
  saveButton: {
    paddingTop: 10,
    paddingBottom: 10
  },
  textStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },
  datePicker: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
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

export class NewContactsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      first: "",
      last: "",
      company: "",
      phone: "",
      email: "",
      url: "",
      addrress: "",
      birthday: "",
      nickname: "",
      facebookProfileUrl: "",
      twitterProfileUrl: "",
      skype: "",
      youtubeChannel: "",
      date: new Date(),
      showDatePicker: false
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Create New Contact",
    headerStyle: { paddingTop: 30 }
  });

  getTextInput = (ref, title) => {
    return <TextInput ref={ref} style={styles.textStyle} placeholder={title} />;
  };

  saveContact = () => {
    /* if (this.state.first === "" || this.state.last === "" || this.state.phone === "") {
      Toast.show("Please enter First name, Last name and phone number.", Toast.LONG);
      return;
    }*/
    const { goBack, state } = this.props.navigation;
    if (state.params.screen == "edit") {
      this.props.updateContact(state.params.first, this.state);
    } else {
      this.props.saveContact(this.state);
    }
    goBack();
  };

  launchDatePicker = async () => {
    if (Platform.OS === "android") {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date()
        });

        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          const d = new Date(year, month, day);
          const datestring = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
          this.setState({ birthday: datestring });
        }
      } catch ({ code, message }) {
        console.warn("Cannot open date picker", message);
      }
    } else {
      this.setState({ showDatePicker: true });
    }
  };

  componentWillMount() {
    const { state } = this.props.navigation;

    if (state.params.screen == "edit") {
      const selectedContact = this.props.contacts.filter(contact => {
        if (contact.first === state.params.first) {
          return contact;
        }
      });
      this.setState(selectedContact[0]);
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    const { showDatePicker } = this.state;
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={() => goBack()}>
          <Image style={{ width: 200, height: 200 }} source={profilePic} />
        </TouchableHighlight>
        <TextInput
          value={this.state.first}
          style={styles.textStyle}
          onChangeText={first => this.setState({ first })}
          placeholder={"First"}
        />
        <TextInput
          value={this.state.last}
          style={styles.textStyle}
          onChangeText={last => this.setState({ last })}
          placeholder={"Last"}
        />
        <TextInput
          value={this.state.company}
          style={styles.textStyle}
          onChangeText={company => this.setState({ company })}
          placeholder={"Company"}
        />
        <TextInput
          value={this.state.phone}
          style={styles.textStyle}
          onChangeText={phone => this.setState({ phone })}
          keyboardType={"phone-pad"}
          placeholder={"Phone"}
        />
        <TextInput
          value={this.state.email}
          style={styles.textStyle}
          onChangeText={email => this.setState({ email })}
          keyboardType={"email-address"}
          placeholder={"Email"}
        />
        <TextInput
          value={this.state.url}
          style={styles.textStyle}
          onChangeText={url => this.setState({ url })}
          placeholder={"Url"}
        />
        <TextInput
          value={this.state.addrress}
          style={styles.textStyle}
          onChangeText={addrress => this.setState({ addrress })}
          placeholder={"Addrress"}
        />
        <TextInput
          value={this.state.birthday}
          style={styles.textStyle}
          onChangeText={birthday => this.setState({ birthday })}
          onFocus={this.launchDatePicker}
          placeholder={"Birthday"}
        />
        <TextInput
          value={this.state.nickname}
          style={styles.textStyle}
          onChangeText={nickname => this.setState({ nickname })}
          placeholder={"Nickname"}
        />
        <TextInput
          value={this.state.facebookProfileUrl}
          style={styles.textStyle}
          onChangeText={facebookProfileUrl => this.setState({ facebookProfileUrl })}
          placeholder={"Facebook Profile Url"}
        />
        <TextInput
          value={this.state.twitterProfileUrl}
          style={styles.textStyle}
          onChangeText={twitterProfileUrl => this.setState({ twitterProfileUrl })}
          placeholder={"Twitter Profile Url"}
        />
        <TextInput
          value={this.state.skype}
          style={styles.textStyle}
          onChangeText={skype => this.setState({ skype })}
          placeholder={"Skype"}
        />
        <TextInput
          value={this.state.youtubeChannel}
          style={styles.textStyle}
          onChangeText={youtubeChannel => this.setState({ youtubeChannel })}
          placeholder={"Youtube Channel"}
        />

        <TouchableHighlight style={styles.button} onPress={() => this.saveContact()}>
          <Text style={styles.saveButton}> Save </Text>
        </TouchableHighlight>

        {showDatePicker ? (
          <View>
            <DatePickerIOS
              style={{ height: 200, backgroundColor: "green" }}
              date={this.state.date}
              onDateChange={date => this.setState({ date })}
              mode="date"
            />
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewContactsScreen);
