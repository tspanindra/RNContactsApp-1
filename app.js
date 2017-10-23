import React, { Component } from 'react';
import MainScreen from './screens/MainScreen';
import NewContactsScreen from './screens/NewContactsScreen';
import { StackNavigator } from 'react-navigation';
import ContactsList from './screens/ContactsList';
import DisplayList from './screens/DisplayList';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import contacts from './state/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import './Reactotron';
import Reactotron from 'reactotron-react-native';

const BasicApp = StackNavigator({
  Main: { screen: MainScreen },
  NewContacts: { screen: NewContactsScreen },
  ContactsList: { screen: ContactsList },
  DisplayList: { screen: DisplayList }
});

let store = Reactotron.createStore(
  contacts,
  global.__REDUX_STATE__,
  compose(applyMiddleware(thunk, logger), autoRehydrate())
);
persistStore(store, { storage: AsyncStorage });

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BasicApp />
      </Provider>
    );
  }
}
