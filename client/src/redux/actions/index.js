import axios from "axios";

// --------------- //

export const GET_USER = "GET_USER";

// --------------- //

export const getUser = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/user",
        {},
        { withCredentials: true }
      );
      return dispatch({ type: GET_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};