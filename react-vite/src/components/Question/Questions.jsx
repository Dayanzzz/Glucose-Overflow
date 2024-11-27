import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../redux/question"; // Your fetch action
import Sidebar from "../SideBar/SideBar";
import './Questions.css';

function Questions() {
  const dispatch = useDispatch();

  // Get all questions from Redux state
  const { questions, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions()); // Fetch all questions when the component mounts
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="question-page-wrapper">
      <Sidebar />
      <div className="questions-list-container">
        <h2 className="question-title">All Questions</h2>
        {questions && questions.length === 0 ? (
          <p>No questions found. Be the first to ask a question!</p>
        ) : (
          <ul className="questions-list">
            {questions && questions.map((question) => (
              <li key={question.id} className="question-item">
                <div className="question-text">
                  <h3>{question.title}</h3>  {/* Display the title here */}
                  <p>{question.question_text}</p>
                  <p>Asked on: {new Date(question.date_asked).toLocaleDateString()}</p>
                  <p>Status: {question.answered ? 'Answered' : 'Unanswered'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Questions;
