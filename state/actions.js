export const SAVE_CONTACT = "SAVE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";

export function saveContact(contact) {
  return dispatch => {
    dispatch({ type: SAVE_CONTACT, data: contact });
  };
}

export function deleteContact(first) {
  return dispatch => {
    dispatch({ type: DELETE_CONTACT, first });
  };
}

export function updateContact(first, contact) {
  return dispatch => {
    dispatch({ type: UPDATE_CONTACT, first, contact });
  };
}
