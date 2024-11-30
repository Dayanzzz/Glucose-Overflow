import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyQuestions, deleteQuestionById } from '../../redux/question';
import Sidebar from "../SideBar/SideBar";
import DeleteConfirmationModal from '../GlucoseTracker/DeleteEntry';
import { useNavigate } from 'react-router-dom';
import './ManageQuestions.css'
import { Link } from 'react-router-dom';

function QuestionManage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 


  const { myQuestions, loading, error } = useSelector((state) => state.questions);

  const [showModal, setShowModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");  

 
  useEffect(() => {
    dispatch(fetchMyQuestions());
  }, [dispatch]);

  const handleDelete = (questionId) => {
    console.log("Attempting to delete question with ID:", questionId);
    setQuestionToDelete(questionId); 
    setShowModal(true); 
  };

  const handleConfirmDelete = async () => {
    if (questionToDelete) {
      try {
        
        const response = await fetch(`/api/questions/manage/${questionToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error);  
        } else {
          dispatch(fetchMyQuestions()); 
          setShowModal(false); 
          setErrorMessage(""); 
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        setErrorMessage('An error occurred while trying to delete the question.');
      }
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false); 
    setErrorMessage(""); 
  };

  const handleEdit = (questionId) => {
    navigate(`/questions/manage/${questionId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="question-page-wrapper">
      <Sidebar />
      <div className="Question-container">
        <h1>My Questions</h1>
        {myQuestions.length === 0 ? (
          <p>You have not asked any questions yet.
             <Link to="/questions/ask">
            <button className="ask-question-button">Ask a Question</button>
          </Link>
          </p>
          
        ) : (
          myQuestions.map((question) => (
            <div key={question.id} className="question-item">
              <p>{question.title}</p>
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

      
      <DeleteConfirmationModal 
        show={showModal} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
        errorMessage={errorMessage}  
      />
    </div>
  );
}

export default QuestionManage;
