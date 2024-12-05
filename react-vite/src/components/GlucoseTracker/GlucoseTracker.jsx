import './GlucoseTracker.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGlucoseEntries, deleteGlucoseEntry } from '../../redux/glucose'; 
import Sidebar from '../SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteEntry'; 

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';  // date-fns for formatting dates

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

  // Format data for the scatter plot
  const chartData = glucoseEntries.flatMap((entry) => [
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.before_breakfast, type: 'Before Breakfast' },
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.before_lunch, type: 'Before Lunch' },
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.before_dinner, type: 'Before Dinner' },
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.hbA1c, type: 'HbA1c' }  // Add HbA1c
  ]);

  // Custom Tooltip to format the date properly
  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const entry = payload[0].payload;  // The data point associated with the tooltip
      const formattedDate = format(new Date(entry.date), 'MM/dd/yyyy'); // Format the date in local time zone
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${formattedDate}`}</p>
          <p>{`Glucose Level: ${entry.glucoseLevel} mg/dL`}</p>
          <p>{`Type: ${entry.type}`}</p> {/* Add type info for clarity */}
        </div>
      );
    }
    return null;
  };

  // Format the X-axis date ticks
  const formatXAxis = (tickItem) => {
    return format(new Date(tickItem), 'MM/dd/yyyy'); // Format as MM/DD/YYYY
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

        <div className="chart-container">
          <h2>Glucose Levels Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="date"
                name="Date"
                domain={['auto', 'auto']}
                tickFormatter={formatXAxis} // Format the X-axis ticks as dates
              />
              <YAxis type="number" dataKey="glucoseLevel" name="Glucose Level (mg/dL)" unit="mg/dL" />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              {/* Add Scatter for each type of glucose measurement */}
              <Scatter name="Before Breakfast" data={chartData.filter(entry => entry.type === 'Before Breakfast')} fill="#8884d8" />
              <Scatter name="Before Lunch" data={chartData.filter(entry => entry.type === 'Before Lunch')} fill="#82ca9d" />
              <Scatter name="Before Dinner" data={chartData.filter(entry => entry.type === 'Before Dinner')} fill="#ff7300" />
              <Scatter name="HbA1c" data={chartData.filter(entry => entry.type === 'HbA1c')} fill="#d84f5a" /> {/* HbA1c in a different color */}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="entries-grid">
          {glucoseEntries.slice(0, 6).map((entry, index) => (
            <div className="entry-card" key={index}>
              <div className="data">
                <h2>HbA1c: {entry.hbA1c}</h2>
                <p>Date: {format(new Date(entry.date), 'MM/dd/yyyy')}</p> {/* Format Date for UI */}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        show={showModal} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
      />
    </div>
  );
}

export default GlucoseTracker;
