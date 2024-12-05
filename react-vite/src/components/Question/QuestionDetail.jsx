import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuestionById } from "../../redux/question";
import { thunkGetComments, thunkAddComment, thunkDeleteComment } from "../../redux/comment";
import { createBookmark } from "../../redux/bookmark"; // Import the createBookmark action
import Sidebar from "../SideBar/SideBar";
import './QuestionDetail.css';

function QuestionDetail() {
  const { questionId } = useParams(); // Get questionId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // Get the question details and comments from Redux state
  const question = useSelector((state) => state.questions.currentQuestion);
  const comments = useSelector((state) => state.comments.comments);
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks); // Get bookmarks from Redux state
  const loading = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.errors);

  // Get the logged-in user's ID from Redux state
  const userId = useSelector((state) => state.session?.user?.id); // Access user ID from session

  const [commentText, setCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Local state for error messages
  const [showPopup, setShowPopup] = useState(false); // State for showing the success popup message

  // Check if the question is already bookmarked by the current user
  const isBookmarked = bookmarks.some((bookmark) => bookmark.question_id === questionId);

  // Fetch the question details and comments when the component mounts
  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId)); // Fetch question details
      dispatch(thunkGetComments(questionId)); // Fetch comments
    }
  }, [dispatch, questionId]);

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText) {
      setErrorMessage("Comment cannot be empty");
      return;
    }

    if (!userId) {
      setErrorMessage("You must be logged in to post a comment.");
      return;
    }

    const commentData = {
      text: commentText,
      user_id: userId, // Use the dynamic user ID
    };

    try {
      await dispatch(thunkAddComment(questionId, commentData.text, commentData.user_id)); // Submit comment
      setCommentText(""); // Reset after submission
    } catch (err) {
      setErrorMessage("An error occurred while posting your comment.");
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    if (!userId) {
      setErrorMessage("You must be logged in to delete a comment.");
      return;
    }

    try {
      // Call the delete action
      await dispatch(thunkDeleteComment(commentId));
    } catch (err) {
      setErrorMessage("An error occurred while deleting the comment.");
    }
  };

 
  const handleBookmark = async () => {
    if (!userId) {
      setErrorMessage("You must be logged in to bookmark a question.");
      return;
    }
  
    // Check if the question is already bookmarked by the user
    if (isBookmarked) {
      setErrorMessage("You have already bookmarked this question.");
      return;
    }
  
    // Check if the user is trying to bookmark their own question
    if (question.user_id === userId) {
      setErrorMessage("You cannot bookmark your own question.");
      return;
    }
      try {
        await dispatch(createBookmark(questionId, userId)); 
       
        setShowPopup(true); 
        setTimeout(() => {
          setShowPopup(false); 
          navigate('/bookmarks'); 
          dispatch(fetchBookmarks());
        }, 2000);
      } catch (err) {
        setErrorMessage("An error occurred while bookmarking the question.");
      }
    
  };

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="right-page">
      
        {question && (
          <div className="question-detail">
            <h1>{question.title}</h1>
            <p>{question.question_text}</p>
            <p><strong>Asked on:</strong> {new Date(question.date_asked).toLocaleDateString()}</p>
            
            <button onClick={handleBookmark} className="bookmark-button">
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        )}

       
        <div className="comments-section">
          <h2>Responses:</h2>
          {loading ? (
            <p>Loading responses...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : comments.length === 0 ? (
            <p>No responses yet. Be the first to respond!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.comment_text}</p>
                <p><strong>Posted on:</strong> {new Date(comment.date_posted).toLocaleDateString()}</p>

              
                {userId === comment.user_id && (
                  <button onClick={() => handleDeleteComment(comment.id)} className="delete-button">
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>

     
        <div className="comment-form">
          <h2>Post a Response</h2>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here"
              required
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">Post Response</button>
          </form>
        </div>

       
        {showPopup && (
          <div className="popup-message">
            <p>Question has been successfully bookmarked!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetail;
