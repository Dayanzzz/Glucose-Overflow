// Select comments from state
export const selectComments = (state) => state.comments;

const initialState = {
  comments: [],
  errors: null,
};

// Action types
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SET_COMMENT_ERRORS = 'SET_COMMENT_ERRORS';

// Action creators
const addComment = (newComment) => ({
  type: ADD_COMMENT,
  payload: newComment,  // New comment payload
});

const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,  // List of comments payload
});

const updateComment = (updatedComment) => ({
  type: UPDATE_COMMENT,
  payload: updatedComment,  // Updated comment payload
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,  // Deleted comment ID payload
});

// Thunk actions

// Fetch all comments for a specific question
export const thunkGetComments = (questionId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/questions/${questionId}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    const data = await response.json();
    dispatch(getComments(data));  // Dispatching the comments list
  } catch (error) {
    console.error('Error fetching comments:', error.message);  // Log errors without modifying state
  }
};

// Add a new comment
export const thunkAddComment = (questionId, comment_text, userId) => async (dispatch) => {
  try {
    const numericQuestionId = parseInt(questionId, 10);  
    console.log("Sending data to POST request:", { comment_text, user_id: userId, question_id: questionId });
    const response = await fetch(`/api/questions/${questionId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_text, user_id: userId }),  // Matching the correct property name 'comment_text'
    });

    if (!response.ok) throw new Error('Failed to add comment');
    const newComment = await response.json();
    dispatch(addComment(newComment));  // Dispatching the newly added comment
  } catch (error) {
    console.error('Error adding comment:', error.message);  // Log errors without modifying state
  }
};

// Update an existing comment
export const thunkUpdateComment = (commentId, comment_text) => async (dispatch) => {
  try {
    const response = await fetch(`/api/questions/comments/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_text }),  // Matching the correct property name 'comment_text'
    });

    if (!response.ok) throw new Error('Failed to update comment');
    const updatedComment = await response.json();
    dispatch(updateComment(updatedComment));  // Dispatching the updated comment
  } catch (error) {
    console.error('Error updating comment:', error.message);  // Log errors without modifying state
  }
};

// Delete a comment
export const thunkDeleteComment = (commentId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/questions/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete comment');
    dispatch(deleteComment(commentId));  // Dispatching the deleted comment ID
  } catch (error) {
    console.error('Error deleting comment:', error.message);  // Log errors without modifying state
  }
};

// Reducer
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,  // Assigning the comments payload
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],  // Adding the new comment
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment  // Updating the specific comment
        ),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),  // Deleting the comment by ID
      };

    default:
      return state;
  }
};

export default commentReducer;
