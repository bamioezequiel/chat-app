import axios from "axios";

// --------------- //

export const GET_USER = "GET_USER";
export const CLEAN_USER = "CLEAN_USER";

// --------------- //

export const cleanUser = () => {
  return async function (dispatch) {
    try {
      return dispatch({ type: CLEAN_USER, payload: {} });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = () => {
  return async function (dispatch) {
    try {
      await cleanUser();
      const { data } = await axios.post(
        "/user",
        {},
        { withCredentials: true }
      );
      return dispatch({ type: GET_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
