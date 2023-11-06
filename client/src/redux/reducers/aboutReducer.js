const initialData = {
  aboutData: {},
};

export const aboutReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ABOUT_DATA": {
      return {
        ...state,
        aboutData: action.payload,
      };
    }

    default:
      return state;
  }
};
