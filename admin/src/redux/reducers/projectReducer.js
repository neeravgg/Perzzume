const initialData = {
  projectData: [],
};

export const projectReducer = (state = initialData, action) => {
  switch (action.type) {
    case "PROJECT_DATA": {
      return {
        ...state,
        projectData: action.payload,
      };
    }

    default:
      return state;
  }
};
