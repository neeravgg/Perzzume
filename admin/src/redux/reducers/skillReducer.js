const initialData = {
  skillData: [],
};

export const skillReducer = (state = initialData, action) => {
  switch (action.type) {
    case "SKILL_DATA": {
      return {
        ...state,
        skillData: action.payload,
      };
    }

    default:
      return state;
  }
};
