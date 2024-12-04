// bookmarkActions.js

export const selectBookmarks = (state) => state.bookmarks.bookmarks;
export const selectLoading = (state) => state.bookmarks.loading;
export const selectError = (state) => state.bookmarks.error;

export const GET_BOOKMARKS = 'GET_BOOKMARKS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';

const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const getBookmarks = (bookmarks) => ({
  type: GET_BOOKMARKS,
  payload: bookmarks,
});

export const deleteBookmark = (bookmarkId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_BOOKMARK,
        payload: bookmarkId,
      });
    } else {
      const data = await response.json();
      throw new Error(data.errors || 'Error deleting bookmark');
    }
  } catch (error) {
    console.error('Error deleting bookmark:', error);
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
      dispatch(getBookmarks(sessionBookmarks));
    } else {
      // Fetch from the external API if not found in session
      const response = await fetch('/api/bookmarks');
      const data = await response.json();

      if (response.ok) {
        dispatch(getBookmarks(data)); // Dispatch the fetched bookmarks to Redux store
      } else {
        dispatch(setError(data.errors || "Error fetching bookmarks")); // Set error if there is one
      }
    }
  } catch (error) {
    dispatch(setError(error.message)); // Handle network or other errors
  } finally {
    dispatch(setLoading(false)); // Set loading to false after fetching is complete
  }
};

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

    case SET_ERROR:
      return {
        ...state,
        error: action.payload, // Set error message if any
        loading: false,
      };

    default:
      return state;
  }
};

export default bookmarkReducer;
