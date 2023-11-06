const initialData = {
experienceData: [],
};

export const experienceReducer = (state = initialData, action) => {
  switch (action.type) {
    case "EXPERIENCE_DATA": {
      return {
        ...state,
        experienceData: action.payload,
      };
    }

    default:
      return state;
  }
};
