import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, updateQuestion, fetchQuestions } from '../../redux/question'; 
import './Update.css'

function UpdateQuestion() {
  const { questionId } = useParams();  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  // Get the question, loading, and error from the Redux store
  const question = useSelector((state) => state.questions.currentQuestion);
  const loading = useSelector((state) => state.questions.loading);
  const error = useSelector((state) => state.questions.error);

  // Local state for holding form input values
  const [questionText, setQuestionText] = useState('');
  const [title, setTitle] = useState('');

  // Fetch the question details when the component mounts
  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId)); 
    }
  }, [questionId, dispatch]);

  // Set initial form values after fetching the question
  useEffect(() => {
    if (question) {
      setTitle(question.title); 
      setQuestionText(question.question_text); 
    }
  }, [question]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the updated question data
    const updatedQuestion = {
      title: title,
      question_text: questionText,
    };

    // Dispatch the update action
    dispatch(updateQuestion(questionId, updatedQuestion)).then(() => {
        dispatch(fetchQuestions());  // Refetch questions after update
      });

    // Redirect to the questions page
    navigate('/questions');
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/questions'); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Edit Question</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

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
