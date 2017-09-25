import { combineReducers } from "redux";
import { SAVE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "./actions";

const initialState = {
  contacts: []
};

const myContacts = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONTACT: {
      return { ...state, contacts: state.contacts.concat(action.data) };
    }
    case DELETE_CONTACT: {
      const reducedContacts = state.contacts.filter(contact => {
        return contact.first != action.first;
      });
      return { ...state, contacts: reducedContacts };
    }
    case UPDATE_CONTACT: {
      const updateContacts = state.contacts.map(contact => {
        if (contact.first === action.first) {
          Object.assign(contact, action.contact);
        }
        return contact;
      });
      return { ...state, contacts: updateContacts };
    }
    default: {
      return initialState;
    }
  }
};

const contacts = combineReducers({
  myContacts
});

export default contacts;
