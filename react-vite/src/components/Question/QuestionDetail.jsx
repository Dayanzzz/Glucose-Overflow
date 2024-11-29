import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestionById } from "../../redux/question"; // Assuming these actions exist
import Sidebar from "../SideBar/SideBar";

function QuestionDetail() {
  const { questionId } = useParams();  // Get questionId from the URL
  const dispatch = useDispatch();

  // Get the question details from Redux state
  const question = useSelector((state) => state.questions.currentQuestion);
  // Comment-related Redux states are commented out as the feature is "coming soon"
  // const comments = useSelector((state) => state.questions.comments);
  // const loading = useSelector((state) => state.questions.loading);
  // const error = useSelector((state) => state.questions.error);

  const [errorMessage, setErrorMessage] = useState(""); // Local state for error messages

  // Fetch the question details when the component mounts
  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId));  // Fetch question details
      // dispatch(fetchComments(questionId));  // Comment fetching is disabled
    }
  }, [dispatch, questionId]);

  // Since comments are coming soon, we can skip comment submission handling
  // const handleSubmitComment = async (e) => {
  //   e.preventDefault();
  //
  //   const commentData = {
  //     comment_text: commentText,
  //   };
  //
  //   try {
  //     await dispatch(createComment(questionId, commentData)); // This action is now commented out
  //     setCommentText(""); // Reset after submission
  //   } catch (err) {
  //     setErrorMessage("An error occurred while posting your comment.");
  //   }
  // };

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
          <p>No comments yet. Be the first to comment!</p>
        </div>

        {/* Comment Form (Coming Soon Message) */}
        <div className="comment-form">
          <h2>Post a Comment</h2>
          <div className="comment-button-container">
            <button
              className="comment-button"
              title="Comments section coming soon"
            >
              Post Comment
            </button>
            <div className="coming-soon-message">Coming Soon!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
