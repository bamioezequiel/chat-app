import { CLEAN_USER, GET_USER } from "../actions";

const initialState = {
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
