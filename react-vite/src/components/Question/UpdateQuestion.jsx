import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, updateQuestion } from '../../redux/question'; 

function UpdateQuestion() {
  const { questionId } = useParams();  
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  
  const question = useSelector((state) => state.questions.currentQuestion);
  const loading = useSelector((state) => state.questions.loading);
  const error = useSelector((state) => state.questions.error);

  const [questionText, setQuestionText] = useState('');


 
  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId)); 
    }
  }, [questionId, dispatch]);

  
  useEffect(() => {
    if (question) {
      setQuestionText(question.question_text); 
    }
  }, [question]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedQuestion = {
     question_text: questionText,
    };

    
    dispatch(updateQuestion(questionId, updatedQuestion));

    
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
