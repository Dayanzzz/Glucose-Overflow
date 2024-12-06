import './GlucoseTracker.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGlucoseEntries, deleteGlucoseEntry } from '../../redux/glucose'; 
import Sidebar from '../SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteEntry'; 

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns'; 
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

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

 
  const handleExportCSV = () => {
    const dataToExport = glucoseEntries.map((entry) => ({
      Date: new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC' }),
      'Before Breakfast': entry.before_breakfast,
      'Before Lunch': entry.before_lunch,
      'Before Dinner': entry.before_dinner,
      HbA1c: entry.hbA1c,
    }));

    const csv = Papa.unparse(dataToExport);

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'glucose_data.csv';
    link.click();
  };

 
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Glucose Data Report", 20, 20);

    doc.setFontSize(12);
    doc.text("Date", 20, 30);
    doc.text("Before Breakfast", 60, 30);
    doc.text("Before Lunch", 100, 30);
    doc.text("Before Dinner", 140, 30);
    doc.text("HbA1c", 180, 30);

    let yPosition = 40;
    glucoseEntries.forEach(entry => {
        // Safely handle each value, default to 'N/A' if null or undefined
        const beforeBreakfast = entry.before_breakfast != null ? entry.before_breakfast.toString() : 'N/A';
        const beforeLunch = entry.before_lunch != null ? entry.before_lunch.toString() : 'N/A';
        const beforeDinner = entry.before_dinner != null ? entry.before_dinner.toString() : 'N/A';
        const hbA1c = entry.hbA1c != null ? entry.hbA1c.toString() : 'N/A';

      
        const formattedDate = format(new Date(entry.date), 'MM/dd/yyyy'); 

        doc.text(formattedDate, 20, yPosition);
        doc.text(beforeBreakfast, 60, yPosition);
        doc.text(beforeLunch, 100, yPosition);
        doc.text(beforeDinner, 140, yPosition);
        doc.text(hbA1c, 180, yPosition);
        yPosition += 10;
    });

    doc.save('glucose_data_report.pdf');
};


  
  const chartData = glucoseEntries.flatMap((entry) => [
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.before_breakfast, type: 'Before Breakfast' },
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.before_lunch, type: 'Before Lunch' },
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.before_dinner, type: 'Before Dinner' },
    { date: new Date(entry.date).getTime(), glucoseLevel: entry.hbA1c, type: 'HbA1c' } 
  ]);

  
  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const entry = payload[0].payload;  
      const formattedDate = new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC' }); 
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${formattedDate}`}</p>
          <p>{`Glucose Level: ${entry.glucoseLevel} mg/dL`}</p>
          <p>{`Type: ${entry.type}`}</p> 
        </div>
      );
    }
    return null;
  };

 
  const formatXAxis = (tickItem) => {
    
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' }); 
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

       
        <div className="export-buttons">
          <button onClick={handleExportCSV} className="export-csv-btn">Export to CSV</button>
          <button onClick={handleExportPDF} className="export-pdf-btn">Export to PDF</button>
        </div>

        
        <div className="chart-container">
          <h2>Glucose Levels Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="date"
                name="Date"
                domain={['auto', 'auto']}
                tickFormatter={formatXAxis} 
              />
              <YAxis type="number" dataKey="glucoseLevel" name="Glucose Level (mg/dL)" unit="mg/dL" />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Before Breakfast" data={chartData.filter(entry => entry.type === 'Before Breakfast')} fill="#8884d8" />
              <Scatter name="Before Lunch" data={chartData.filter(entry => entry.type === 'Before Lunch')} fill="#82ca9d" />
              <Scatter name="Before Dinner" data={chartData.filter(entry => entry.type === 'Before Dinner')} fill="#ff7300" />
              <Scatter name="HbA1c" data={chartData.filter(entry => entry.type === 'HbA1c')} fill="#d84f5a" /> 
            </ScatterChart>
          </ResponsiveContainer>
        </div>

       
        <div className="entries-grid">
          {glucoseEntries.slice(0, 6).map((entry, index) => (
            <div className="entry-card" key={index}>
              <div className="data">
                <h2>HbA1c: {entry.hbA1c}</h2>
              
                <p>Date: {new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</p>
                <div className="glucose-levels">
                  <p>Before Breakfast: {entry.before_breakfast} mg/dL</p>
                  <p>Before Lunch: {entry.before_lunch} mg/dL</p>
                  <p>Before Dinner: {entry.before_dinner} mg/dL</p>
                </div>
              </div>
              <div className="entry-buttons">
                <button onClick={() => handleEdit(entry.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(entry.id)} className="delete-btn">Delete</button>
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
