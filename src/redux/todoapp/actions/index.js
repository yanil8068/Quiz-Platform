export const ADD_QUIZ = "ADD_QUIZ";
export const REMOVE_QUIZ = "REMOVE_QUIZ";
export const UPDATE_QUIZ = "UPDATE_QUIZ";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const TOGGLE_QUIZ_COMPLETED = "TOGGLE_QUIZ_COMPLETED";
export const SET_USER = "SET_USER";

export const addQuiz = (payload) => {
  return (dispatch) => {
    // Perform any asynchronous operations here (e.g., API calls)
    // Then dispatch the actual action once the asynchronous operation is complete
    dispatch({
      type: ADD_QUIZ,
      payload,
    });
  };
};

export const removeTodo = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_QUIZ,
      payload,
    });
  };
};

export const handleEditSubmit = (payload) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_QUIZ,
      payload,
    });
  };
};

export const deleteQuestion = (questionIndex) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_QUESTION,
      payload: { questionIndex },
    });
  };
};

export const toggleQuizCompleted = (id) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_QUIZ_COMPLETED,
      payload: id,
    });
  };
};

export const setUser = (user) => {
  console.log("set user action is acalled");
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };
};
