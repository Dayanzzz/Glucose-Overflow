
export const selectGlucose = (state) => state.glucose.glucoseEntries;


const initialState = {
  glucoseEntries: [],
};


const GET_GLUCOSE = "glucose/getGlucose";
const ADD_GLUCOSE = "glucose/addGlucose";
const DELETE_GLUCOSE = "glucose/deleteGlucose";
const UPDATE_GLUCOSE = "glucose/updateGlucose";


const getGlucose = (glucoseEntries) => ({
  type: GET_GLUCOSE,
  payload: glucoseEntries,
});

const addGlucose = (addedGlucose) => ({
  type: ADD_GLUCOSE,
  payload: addedGlucose,
});

const deleteGlucose = (glucoseToDelete) => ({
  type: DELETE_GLUCOSE,
  payload: glucoseToDelete,
});

const updateGlucoseAction = (updatedGlucose) => ({
  type: UPDATE_GLUCOSE,
  payload: updatedGlucose,
});



// Add a Glucose Entry
export const createGlucoseEntry = (addedGlucose) => async (dispatch) => {
 

  try {
    const response = await fetch("/api/glucose", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addedGlucose),
    });

    const data = await response.json();
    console.error('error details', data)

    if (!response.ok) {
      if (response.status === 400) {
        console.error('Validation Errors:', data.errors);
        console.log('Error response data:', data);
        throw data.errors;
      }
      throw new Error(data.message || 'Failed to create glucose entry');
    }

    dispatch(addGlucose(data));
    return data;

  } catch (error) {
    console.error('Error creating glucose entry:', error);
    throw error;
  }
};

// Get All Glucose Entries
export const getAllGlucoseEntries = () => async (dispatch) => {
  const response = await fetch("/api/glucose");

  if (response.ok) {
    const data = await response.json();
    dispatch(getGlucose(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

// Update a Glucose Entry
export const updateGlucoseEntry = (glucoseId, updatedGlucose) => async (dispatch) => {
  try {
    const response = await fetch(`/api/glucose/${glucoseId}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGlucose),
    });

    if (response.ok) {
      const updatedData = await response.json();
      console.log("updated data=============", updatedData)
      dispatch(updateGlucoseAction(updatedData));
      dispatch(getAllGlucoseEntries());
    }
  } catch (err) {
    console.error(`Error updating glucose entry: ${err}`);
  }
};

// Delete a Glucose Entry
export const deleteGlucoseEntry = (glucoseId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/glucose/${glucoseId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteGlucose(glucoseId));
    } else {
      throw new Error('Failed to delete glucose entry');
    }
  } catch (error) {
    console.error('Error deleting glucose entry', error);
  }
};

// Reducer
const glucoseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLUCOSE:
      return {
        ...state,
        glucoseEntries: action.payload,
      };

    case ADD_GLUCOSE:
      return {
        ...state,
        glucoseEntries: [...state.glucoseEntries, action.payload],
      };

    case DELETE_GLUCOSE:
      return {
        ...state,
        glucoseEntries: state.glucoseEntries.filter((entry) => entry.id !== action.payload),
      };

    case UPDATE_GLUCOSE:
        console.log('State before update:', state); 
      console.log('Updated data:', action.payload); 
      return {
        ...state,
        glucoseEntries: state.glucoseEntries.map((entry) =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };

    default:
      return state;
  }
};

export default glucoseReducer;
