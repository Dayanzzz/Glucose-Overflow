
export const selectQuestions = (state) => state.questions;


const initialState = {
    questions: [],
    myQuestions: [],
    currentQuestion: null,
    comments:[],
    loading: false,
    error: null,
  };



export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_MY_QUESTIONS = 'GET_MY_QUESTIONS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const GET_QUESTION_BY_ID = 'GET_QUESTION_BY_ID';

export const GET_COMMENTS = 'GET_COMMENTS';
export const POST_COMMENT = 'POST_COMMENT';

const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});

const postComment = (comment) => ({
  type: POST_COMMENT,
  payload: comment,
});



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

// export const fetchComments = (questionId) => async (dispatch) => {
//     try {
//       const response = await fetch(`/api/questions/${questionId}/comments`);
//       const data = await response.json();
//       if (response.ok) {
//         dispatch(getComments(data));
//       } else {
//         console.error("Error fetching comments:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };
  
//   export const createComment = (questionId, commentData) => async (dispatch) => {
//     try {
//       const response = await fetch(`/api/questions/${questionId}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(commentData),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         dispatch(postComment(data));  // Dispatch the new comment to Redux
//       } else {
//         console.error("Error posting comment:", data);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

export const fetchQuestionById = (questionId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`);
      const data = await response.json();
  
      if (response.ok) {
        dispatch(getQuestionById(data)); 
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
        dispatch(createQuestionAction(data)); 
      } else {
        console.error("Error creating question:", data);
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };
  
  
  export const updateQuestion = (questionId, updatedData) => async (dispatch) => {
    try {
      const response = await fetch(`/api/questions/manage/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch(updateQuestionAction(data)); 
      } else {
        console.error("Error updating question:", data);
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  
  
  export const deleteQuestionById = (questionId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/questions/manage/${questionId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch(deleteQuestion(questionId)); 
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
          questions: [action.payload, ...state.questions], 
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
              currentQuestion: action.payload, 
            };
      default:
        return state;
    }
  };
  
  export default questionReducer;