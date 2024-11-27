import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AskQuestion.css';
import Sidebar from '../SideBar/SideBar'

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState(''); // Renamed to reflect question_text
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      question_text: questionText, // Send only question_text
    };

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/questions'); // Redirect to the list of questions after successful submission
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error while submitting question');
      console.error(err);
    }
  };

  return (
    <div className="AskQuestion-wrapper">
      <Sidebar />
      <div className="ask-question-container">
        <h1>Ask a Question About Your Health</h1>
        <p>Have a question regarding diabetes, nutrition, or any other health-related topic? We are here to help!</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="questionText">Your Question:</label> {/* Changed label for clarity */}
            <textarea
              id="questionText"
              value={questionText} // Updated to questionText state
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit Question</button>
        </form>

        {error && <p className="error">{error}</p>} {/* Display error message if exists */}
      </div>
    </div>
  );
};

export default CreateQuestion;
