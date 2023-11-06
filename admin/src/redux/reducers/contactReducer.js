const initialData = {
  contactData: [],
};

export const contactReducer = (state = initialData, action) => {
  switch (action.type) {
    case "CONTACT_DATA": {
      return {
        ...state,
        contactData: action.payload,
      };
    }

    default:
      return state;
  }
};
