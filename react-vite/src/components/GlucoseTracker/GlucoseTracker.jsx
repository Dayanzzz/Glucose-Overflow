import './GlucoseTracker.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGlucoseEntries, deleteGlucoseEntry } from '../../redux/glucose'; 
import Sidebar from '../SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteEntry'; 

function GlucoseTracker() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const glucoseEntries = useSelector((state) => state.glucose.glucoseEntries); 

  const [showModal, setShowModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllGlucoseEntries()); 
  }, [dispatch]);

  const handleEdit = (entryId) => {
    navigate(`/glucose/${entryId}`); 
  };

  const handleDelete = (entryId) => {
    setEntryToDelete(entryId);
    setShowModal(true); 
  };

  const handleConfirmDelete = () => {
    if (entryToDelete) {
      dispatch(deleteGlucoseEntry(entryToDelete)); 
      setShowModal(false);  
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);  
  };

  const handleCreateNewEntry = () => {
    navigate('/glucose/new'); 
  };

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="right">
        <div><h1 className="glucose-title">Blood Sugar Entries</h1></div>

        
        <div className="create-entry-btn">
          <button onClick={handleCreateNewEntry} className="create-entry-btn">
            Create Your Daily Journal Today
          </button>
        </div>

        <div className="entries-grid">
          {glucoseEntries.slice(0, 6).map((entry, index) => (
            <div className="entry-card" key={index}>
              <div className="data">
              <h2>HbA1c: {entry.hbA1c}</h2>
              <p>Date: {new Date(entry.date).toISOString().split('T')[0]}</p>
              <div className="glucose-levels">
                <p>Before Breakfast: {entry.before_breakfast} mg/dL</p>
                <p>Before Lunch: {entry.before_lunch} mg/dL</p>
                <p>Before Dinner: {entry.before_dinner} mg/dL</p>
              </div>
              </div>
              <div className="entry-buttons">
                <button onClick={() => handleEdit(entry.id)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(entry.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <DeleteConfirmationModal 
        show={showModal} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
      />
    </div>
  );
}

export default GlucoseTracker;
