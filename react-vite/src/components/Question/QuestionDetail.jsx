import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestionById, createComment, fetchComments } from "../../redux/question"; // Assuming these actions exist
import Sidebar from "../SideBar/SideBar";

function QuestionDetail() {
  const { questionId } = useParams();  // Get questionId from the URL
  const dispatch = useDispatch();

  // Get the question details from Redux state
  const question = useSelector((state) => state.questions.currentQuestion);
  const comments = useSelector((state) => state.questions.comments);
  const loading = useSelector((state) => state.questions.loading);
  const error = useSelector((state) => state.questions.error);

  const [commentText, setCommentText] = useState(""); // Local state for user's comment
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the question details and comments when the component mounts
  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId));  // Fetch question details
      dispatch(fetchComments(questionId));  // Fetch comments for the specific question
    }
  }, [dispatch, questionId]);

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    // Create comment object
    const commentData = {
      comment_text: commentText,
    };

    // Dispatch the action to submit the comment
    try {
      await dispatch(createComment(questionId, commentData)); // Assuming createComment action exists
      setCommentText(""); // Reset the comment input after submission
    } catch (err) {
      setErrorMessage("An error occurred while posting your comment.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="right-page">
        {/* Question Details */}
        {question && (
          <div className="question-detail">
            <h1>{question.title}</h1>
            <p>{question.question_text}</p>
            <p><strong>Asked on:</strong> {new Date(question.date_asked).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {question.answered ? 'Answered' : 'Unanswered'}</p>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <h2>Comments</h2>
          {comments && comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="comments-list">
              {comments.map((comment) => (
                <li key={comment.id} className="comment-item">
                  <p>{comment.comment_text}</p>
                  <p><strong>Posted on:</strong> {new Date(comment.date_posted).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Comment Form */}
        <div className="comment-form">
          <h2>Post a Comment</h2>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Type your comment here..."
              required
            ></textarea>
            <button type="submit">Submit Comment</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
