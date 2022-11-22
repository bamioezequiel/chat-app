import { GET_USER } from "../actions";

const initialState = {
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }
};

export default rootReducer;
