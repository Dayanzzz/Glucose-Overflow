import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../redux/question";
import Sidebar from "../SideBar/SideBar";
import { Link } from "react-router-dom";
import './Questions.css';

function Questions() {
  const dispatch = useDispatch();

  const { questions, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="question-page-wrapper">
      <Sidebar className="question-sidebar"/>
      <div className="questions-list-container">
        <div className="questions-header">
          <h2 className="question-title">All Questions</h2>
        
          <Link to="/questions/ask">
            <button className="ask-question-btn">Ask a Question</button>
          </Link>
        </div>
        
        {questions && questions.length === 0 ? (
          <p>No questions found. Be the first to ask a question!</p>
        ) : (
          <ul className="questions-list">
            {questions && questions.map((question) => (
              <li key={question.id} className="question-item">
                <div className="question-text">
                  <h3>
                    <Link to={`/questions/${question.id}`} className="question-title-link">
                      {question.title}
                    </Link>
                  </h3>
                  <p>{question.question_text}</p>
                  <p>Asked on: {new Date(question.date_asked).toLocaleDateString()}</p>
                  {question.has_responses ? (
                    <p className="response-status">This question has responses</p>
                  ) : (
                    <p className="response-status">This question has not been answered yet</p>
                  )}
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
