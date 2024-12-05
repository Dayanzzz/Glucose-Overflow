// bookmarkActions.js

export const selectBookmarks = (state) => state.bookmarks.bookmarks;
export const selectLoading = (state) => state.bookmarks.loading;
export const selectError = (state) => state.bookmarks.error;

export const GET_BOOKMARKS = 'GET_BOOKMARKS';
export const SET_LOADING = 'SET_LOADING';
// export const SET_ERROR = 'SET_ERROR';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const ADD_BOOKMARK = 'ADD_BOOKMARK'; // Add new action type

const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

// const setError = (error) => ({
//   type: SET_ERROR,
//   payload: error,
// });

const getBookmarks = (bookmarks) => ({
  type: GET_BOOKMARKS,
  payload: bookmarks,
});
export const addBookmark = (bookmark) => ({
  type: ADD_BOOKMARK,
  payload: bookmark,
});

// Thunk to delete a bookmark
export const deleteBookmark = (bookmarkId) => async (dispatch) => {
  try {
    console.log('Attempting to delete bookmark with ID:', bookmarkId); // Log the bookmark ID being deleted

    const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Bookmark deleted successfully with ID:', bookmarkId); // Log success
      dispatch({
        type: DELETE_BOOKMARK,
        payload: bookmarkId, // Dispatch the deleted bookmark ID to remove it from the state
      });
    } else {
      const data = await response.json();
      console.error('Error deleting bookmark:', data.errors || 'Unknown error'); // Log the error message
    }
  } catch (error) {
    console.error('Error in deleting bookmark:', error); // Log any unexpected errors
  }
};

// Thunk action to fetch bookmarks from session or external API
export const fetchBookmarks = () => async (dispatch, getState) => {
  dispatch(setLoading(true)); // Set loading to true before fetching

  try {
    const state = getState();
    
    // Check if bookmarks are available in the session or in the redux store
    const sessionBookmarks = state.session.user?.bookmarked_questions;
    
    if (sessionBookmarks && sessionBookmarks.length > 0) {
      // If bookmarks exist in session (from Redux or session storage), use them
      console.log("Bookmarks fetched from session:", sessionBookmarks);
      dispatch(getBookmarks(sessionBookmarks));
    } else {
      // Fetch from the external API if not found in session
      const response = await fetch('/api/bookmarks');
      const data = await response.json();

      if (response.ok) {
        console.log("Bookmarks fetched from API:", data);
        dispatch(getBookmarks(data)); // Dispatch the fetched bookmarks to Redux store
      } else {
        console.error("Error fetching bookmarks:", data.errors || "Unknown error");
      }
    }
  } catch (error) {
    console.error('Error fetching bookmarks:', error.message); // Log any network or other errors
  } finally {
    dispatch(setLoading(false)); // Set loading to false after fetching is complete
  }
};

// Create bookmark thunk (no more setError, just logging)
export const createBookmark = (questionId, userId) => async (dispatch) => {
  try {
    const numericQuestionId = parseInt(questionId, 10);

    console.log('Creating bookmark with:', { numericQuestionId, userId });

    // Client-side validation for userId and questionId
    if (!userId || !Number.isInteger(userId)) {
      console.error('Invalid user ID');
      return;
    }

    if (!numericQuestionId || !Number.isInteger(numericQuestionId)) {
      console.error('Invalid question ID');
      return;
    }

    // Send the request with credentials (cookies) for session-based authentication
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // This ensures cookies are sent with the request
      body: JSON.stringify({ user_id: userId, question_id: numericQuestionId }), // Send the question_id in the request body
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Bookmark successfully created:', data); // Log the success response
      dispatch(addBookmark(data)); // Dispatch the newly created bookmark to the Redux store
    } else {
      const data = await response.json();
      console.error('Error creating bookmark:', data.errors || 'Unknown error'); // Log the error for debugging
    }
  } catch (error) {
    console.error('Error in creating bookmark:', error); // Log any unexpected errors
  }
};



// export const deleteBookmark = (bookmarkId) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       dispatch({
//         type: DELETE_BOOKMARK,
//         payload: bookmarkId,
//       });
//     } else {
//       const data = await response.json();
//       throw new Error(data.errors || 'Error deleting bookmark');
//     }
//   } catch (error) {
//     console.error('Error deleting bookmark:', error);
//   }
// };
// // Thunk action to fetch bookmarks from session or external API
// export const fetchBookmarks = () => async (dispatch, getState) => {
//   dispatch(setLoading(true)); // Set loading to true before fetching

//   try {
//     const state = getState();
    
//     // Check if bookmarks are available in the session or in the redux store
//     const sessionBookmarks = state.session.user?.bookmarked_questions;
    
//     if (sessionBookmarks && sessionBookmarks.length > 0) {
//       // If bookmarks exist in session (from Redux or session storage), use them
//       dispatch(getBookmarks(sessionBookmarks));
//     } else {
//       // Fetch from the external API if not found in session
//       const response = await fetch('/api/bookmarks');
//       const data = await response.json();

//       if (response.ok) {
//         dispatch(getBookmarks(data)); // Dispatch the fetched bookmarks to Redux store
//       } else {
//         dispatch(setError(data.errors || "Error fetching bookmarks")); // Set error if there is one
//       }
//     }
//   } catch (error) {
//     dispatch(setError(error.message)); // Handle network or other errors
//   } finally {
//     dispatch(setLoading(false)); // Set loading to false after fetching is complete
//   }
// };

// export const createBookmark = (questionId, userId) => async (dispatch) => {
//   try {
//     console.log('Question ID:', questionId);
//     // Client-side validation for userId and questionId
//     if (!userId || !Number.isInteger(userId)) {
//       throw new Error('Invalid user ID');
//     }

//     if (!questionId || !Number.isInteger(questionId)) {
//       throw new Error('Invalid question ID');
//     }

//     const response = await fetch('/api/bookmarks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user_id: userId, question_id: questionId }), // Send the question_id in the request body
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(addBookmark(data)); // Dispatch the newly created bookmark to the Redux store
//     } else {
//       const data = await response.json();
//       console.error('Error data from server:', data); // Log the error for debugging
//       throw new Error(data.errors || 'Error creating bookmark');
//     }
//   } catch (error) {
//     console.error('Error in creating bookmark:', error);
//     dispatch(setError(error.message)); // Dispatch the error message to Redux store
//   }
// };



const initialState = {
  bookmarks: [],
  loading: false,
  error: null,
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload, // Set fetched bookmarks into state
        loading: false,
      };
      case ADD_BOOKMARK:
        console.log('Adding bookmark to state:', action.payload);
        return {
          ...state,
          bookmarks: [...state.bookmarks, action.payload], // Add the new bookmark to the list
        };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload, // Update loading state
      };
      case DELETE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== action.payload), // Remove deleted bookmark
      };

    // case SET_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload, // Set error message if any
    //     loading: false,
    //   };

    default:
      return state;
  }
};

export default bookmarkReducer;
