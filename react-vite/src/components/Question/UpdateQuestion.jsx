import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, updateQuestion, fetchQuestions } from '../../redux/question'; 
import './Update.css'

function UpdateQuestion() {
  const { questionId } = useParams();  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const question = useSelector((state) => state.questions.currentQuestion);
  const loading = useSelector((state) => state.questions.loading);
  const error = useSelector((state) => state.questions.error);


  const [questionText, setQuestionText] = useState('');
  const [title, setTitle] = useState('');


  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId)); 
    }
  }, [questionId, dispatch]);


  useEffect(() => {
    if (question) {
      setTitle(question.title); 
      setQuestionText(question.question_text); 
    }
  }, [question]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const updatedQuestion = {
      title: title,
      question_text: questionText,
    };

   
    dispatch(updateQuestion(questionId, updatedQuestion)).then(() => {
        dispatch(fetchQuestions());  
      });


    navigate('/questions');
  };


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
