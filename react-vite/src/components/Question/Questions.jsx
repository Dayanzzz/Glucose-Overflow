import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, addComment, deleteComment, updateComment } from "../../redux/question"; 
import Sidebar from "../SideBar/SideBar";
import './Questions.css';

function Questions() {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const { questions, loading, error } = useSelector((state) => state.questions);
  const user = useSelector((state) => state.user); // Assuming you store the logged-in user's info

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleAddComment = (questionId) => {
    if (!newComment.trim()) return;

    dispatch(addComment(questionId, newComment));
    setNewComment(""); // Clear comment input field
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleUpdateComment = (commentId, updatedText) => {
    dispatch(updateComment(commentId, updatedText));
  };

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
            {questions.map((question) => (
              <li key={question.id} className="question-item">
                <div className="question-text">
                  <h3>{question.question_text}</h3>
                  <p>Asked on: {new Date(question.date_asked).toLocaleDateString()}</p>
                  <p>Status: {question.answered ? 'Answered' : 'Unanswered'}</p>
                </div>

                {/* Display Comments for this question */}
                <div className="comments-section">
                  <h4>Comments</h4>
                  {question.comments && question.comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                  ) : (
                    <ul className="comments-list">
                      {question.comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                          <p>{comment.comment_text}</p>
                          <p>Posted on: {new Date(comment.date_posted).toLocaleDateString()}</p>

                          {/* Check if the logged-in user is the one who posted the comment */}
                          {user && user.id === comment.user_id && (
                            <div className="comment-actions">
                              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                              <button onClick={() => handleUpdateComment(comment.id, prompt("Edit your comment:", comment.comment_text))}>Edit</button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Input for adding a new comment */}
                  {user && (
                    <div className="add-comment">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                      />
                      <button onClick={() => handleAddComment(question.id)}>Add Comment</button>
                    </div>
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

