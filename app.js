import React, { Component } from "react";
import MainScreen from "./screens/MainScreen";
import NewContactsScreen from "./screens/NewContactsScreen";
import { StackNavigator } from "react-navigation";
import ContactsList from "./screens/ContactsList";
import DisplayList from "./screens/DisplayList";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import contacts from "./state/reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const BasicApp = StackNavigator({
  Main: { screen: MainScreen },
  NewContacts: { screen: NewContactsScreen },
  ContactsList: { screen: ContactsList },
  DisplayList: { screen: DisplayList }
});

let store = createStore(contacts, applyMiddleware(thunk, logger));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BasicApp />
      </Provider>
    );
  }
}
