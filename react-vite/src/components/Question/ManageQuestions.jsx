import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyQuestions, deleteQuestionById } from '../../redux/question';
import Sidebar from "../SideBar/SideBar";
import DeleteConfirmationModal from '../GlucoseTracker/DeleteEntry';
import { useNavigate } from 'react-router-dom';

function QuestionManage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Accessing the user's questions from Redux
  const { myQuestions, loading, error } = useSelector((state) => state.questions);

  const [showModal, setShowModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");  // State to hold error message

  // Fetch user's questions on component mount
  useEffect(() => {
    dispatch(fetchMyQuestions());
  }, [dispatch]);

  const handleDelete = (questionId) => {
    console.log("Attempting to delete question with ID:", questionId);
    setQuestionToDelete(questionId); // Store the ID of the question to be deleted
    setShowModal(true); // Show the modal
  };

  const handleConfirmDelete = async () => {
    if (questionToDelete) {
      try {
        // Dispatch delete action
        const response = await fetch(`/api/questions/${questionToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error);  // Set error message if any
        } else {
          dispatch(fetchMyQuestions()); // Re-fetch the questions
          setShowModal(false); // Close the modal after deleting
          setErrorMessage(""); // Clear any error message
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        setErrorMessage('An error occurred while trying to delete the question.');
      }
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
    setErrorMessage(""); // Clear any error message when canceling
  };

  const handleEdit = (questionId) => {
    navigate(`/questions/${questionId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="question-page-wrapper">
      <Sidebar />
      <div className="Question-container">
        <h1>My Questions</h1>
        {myQuestions.length === 0 ? (
          <p>You have not asked any questions yet.</p>
        ) : (
          myQuestions.map((question) => (
            <div key={question.id} className="question-item">
              <p>{question.question_text}</p>
              <p>{question.date_asked}</p>

              <div className="question-buttons">
                <button onClick={() => handleEdit(question.id)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(question.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for delete confirmation */}
      <DeleteConfirmationModal 
        show={showModal} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
        errorMessage={errorMessage}  // Pass the error message to the modal
      />
    </div>
  );
}

export default QuestionManage;
