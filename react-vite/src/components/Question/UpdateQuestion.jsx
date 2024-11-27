import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, updateQuestion } from '../../redux/question'; // You might need to create the action for fetching and updating questions

function UpdateQuestion() {
  const { questionId } = useParams();  // Get the questionId from the URL
  const navigate = useNavigate(); // To redirect after saving
  const dispatch = useDispatch();

  // Redux state (assuming you store questions in Redux state)
  const question = useSelector((state) => state.questions.currentQuestion);
  const loading = useSelector((state) => state.questions.loading);
  const error = useSelector((state) => state.questions.error);

  // Local state for the form
  const [questionText, setQuestionText] = useState('');


  // Fetch question details when component mounts or when questionId changes
  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId)); // Fetch question data
    }
  }, [questionId, dispatch]);

  // Pre-populate the form when question data is available
  useEffect(() => {
    if (question) {
      setQuestionText(question.question_text); // Set the question_text from the Redux state
    }
  }, [question]);

  // Handle form submit to update the question
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedQuestion = {
     question_text: questionText,
    };

    // Dispatch the update action (you will need to write the update action and reducer)
    dispatch(updateQuestion(questionId, updatedQuestion));

    // After successful update, navigate back to the question list or the question page
    navigate('/questions');
  };

  // Handle cancel (you can redirect back to the question list or previous page)
  const handleCancel = () => {
    navigate('/questions'); // Or redirect to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Edit Question</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text:</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateQuestion;
