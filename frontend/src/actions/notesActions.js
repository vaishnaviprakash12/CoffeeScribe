import axios from "axios";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS } from "../constants/noteConstants";
export const listNotes = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: NOTE_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getstate();

    //getState functions all of our app state
    console.log('userInfo', userInfo);
    console.log('token', userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },

    };
    //making request to get notes according to the token provided
    const { data } = await axios.get('/api/notes', config);
    //if fetching the notes is sucessfull dispatch this event
    dispatch({
      type: NOTE_LIST_SUCCESS,
      payload: data,
    });

  }
  catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: NOTE_LIST_FAIL,
      payload: message
    });
  }

}

//create note functionality

export const createNoteAction =
  (title, content, category) => async (dispatch, getstate) => {
    try {
      dispatch(
        {
          type: NOTE_CREATE_REQUEST,
        }
      );
      const { userLogin: { userInfo } } = getstate();
            const config = {
        headers: {
          //content type-what type of content we are sending so we are sending the data in json format
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },

      };
      //making api calls for crreating note
      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );
      //once api calls sucess dispatch note create sucess reducer,
      dispatch({
        type: NOTE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload: message
      });
    }
  };

//update note functionality
// noteAction.js

export const updateNoteAction = (id, title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/notes/${id}`, { title, content, category }, config);

    dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
 export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/notes/${id}`, config);

    dispatch({ type: NOTE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};