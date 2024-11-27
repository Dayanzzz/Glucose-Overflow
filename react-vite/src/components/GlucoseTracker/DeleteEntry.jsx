
import './DeleteEntryModal.css';

const DeleteConfirmationModal = ({ show, onConfirm, onCancel, errorMessage }) => {
  if (!show) return null;  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to delete this note?</h2>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <div className="modal-buttons-deletenote">
          <button onClick={onConfirm} className="confirm-del-notebtn">Yes, Delete</button>
          <button onClick={onCancel} className="cancel-de-note-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
