
export const selectQuestions = (state) => state.questions;


const initialState = {
    questions: [],
    myQuestions: [],
    currentQuestion: null,
    loading: false,
    error: null,
  };



export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_MY_QUESTIONS = 'GET_MY_QUESTIONS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const GET_QUESTION_BY_ID = 'GET_QUESTION_BY_ID';


const getQuestions = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions,
  });

  const getQuestionById = (question) => ({
    type: GET_QUESTION_BY_ID,
    payload: question,
  });

  const getMyQuestions = (questions) => ({
    type: GET_MY_QUESTIONS,
    payload: questions,
  });
  
  const createQuestionAction = (newQuestion) => ({
    type: CREATE_QUESTION,
    payload: newQuestion,
  });
  
  const deleteQuestion = (questionId) => ({
    type: DELETE_QUESTION,
    payload: questionId,
  });
  
  const updateQuestionAction = (updatedQuestion) => ({
    type: UPDATE_QUESTION,
    payload: updatedQuestion,
  });



// Action Creators

export const fetchQuestionById = (questionId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`);
      const data = await response.json();
  
      if (response.ok) {
        dispatch(getQuestionById(data)); // Dispatch to store the question in Redux state
      } else {
        console.error("Error fetching question by ID:", data);
      }
    } catch (error) {
      console.error("Error fetching question by ID:", error);
    }
  };


export const fetchQuestions = () => async (dispatch) => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
  
      if (response.ok) {
        dispatch(getQuestions(data));
      } else {
        console.error("Error fetching questions:", data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  
  // Thunk Action: Fetch the questions created by the current user (my questions)
  export const fetchMyQuestions = () => async (dispatch) => {
    try {
      const response = await fetch('/api/questions/manage');
      const data = await response.json();
  
      if (response.ok) {
        dispatch(getMyQuestions(data));
      } else {
        console.error("Error fetching my questions:", data);
      }
    } catch (error) {
      console.error("Error fetching my questions:", error);
    }
  };
  
  // Thunk Action: Create a new question
  export const createQuestion = (newQuestionData) => async (dispatch) => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestionData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch(createQuestionAction(data)); // Dispatch to add the new question to Redux store
      } else {
        console.error("Error creating question:", data);
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };
  
  // Thunk Action: Update an existing question
  export const updateQuestion = (questionId, updatedData) => async (dispatch) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch(updateQuestionAction(data)); // Dispatch to update question in Redux store
      } else {
        console.error("Error updating question:", data);
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  
  // Thunk Action: Delete a question
  export const deleteQuestionById = (questionId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch(deleteQuestion(questionId)); // Dispatch to delete the question from Redux store
      } else {
        console.error("Error deleting question:", response);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const questionReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_QUESTIONS:
        return {
          ...state,
          questions: action.payload,
          loading: false,
        };
      case GET_MY_QUESTIONS:
        return {
          ...state,
          myQuestions: action.payload,
          loading: false,
        };
      case CREATE_QUESTION:
        return {
          ...state,
          questions: [action.payload, ...state.questions], // Adds new question at the beginning
        };
      case UPDATE_QUESTION:
        return {
          ...state,
          questions: state.questions.map((question) =>
            question.id === action.payload.id ? action.payload : question
          ),
        };
      case DELETE_QUESTION:
        return {
          ...state,
          myQuestions: state.myQuestions.filter((question) => question.id !== action.payload),
        };
        case GET_QUESTION_BY_ID:
            return {
              ...state,
              currentQuestion: action.payload, // Store the fetched question in currentQuestion
            };
      default:
        return state;
    }
  };
  
  export default questionReducer;