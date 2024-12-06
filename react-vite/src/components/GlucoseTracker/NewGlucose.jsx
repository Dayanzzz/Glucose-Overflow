import Sidebar from '../SideBar/SideBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewGlucose.css';

function NewGlucose() {
  const [date, setDate] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [hbA1c, setHbA1c] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!breakfast && !lunch && !dinner) {
      setError('Please fill in at least one meal value (Breakfast, Lunch, or Dinner).');
      return;
    }
  
    
    const selectedDate = new Date(date + "T00:00:00Z"); 
    const formattedDate = selectedDate.toISOString().split('T')[0]; 
  
    const data = {
      date: formattedDate, 
      before_breakfast: breakfast ? parseFloat(breakfast) : null,
      before_lunch: lunch ? parseFloat(lunch) : null,
      before_dinner: dinner ? parseFloat(dinner) : null,
      hbA1c: hbA1c ? parseFloat(hbA1c) : null,
    };
  
    console.log('Data being sent to API:', data);
  
    try {
      const response = await fetch('/api/glucose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        navigate('/glucose');
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error while creating blood sugar entry');
      console.error(err);
    }
  };
  
  

  return (
    <div className="Create-wrapper">
      <Sidebar />
      <div className="create-blood-sugar-container">
        <h1>Create New Blood Sugar Entry</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="breakfast">Before Breakfast (mg/dL):</label>
            <input
              type="number"
              id="breakfast"
              value={breakfast || ''}
              onChange={(e) => setBreakfast(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lunch">Before Lunch (mg/dL):</label>
            <input
              type="number"
              id="lunch"
              value={lunch || ''}
              onChange={(e) => setLunch(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dinner">Before Dinner (mg/dL):</label>
            <input
              type="number"
              id="dinner"
              value={dinner || ''}
              onChange={(e) => setDinner(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hbA1c">HbA1c (optional):</label>
            <input
              type="number"
              id="hbA1c"
              value={hbA1c || ''}
              onChange={(e) => setHbA1c(e.target.value)}
            />
          </div>
          <button type="submit">Create Blood Sugar Entry</button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default NewGlucose;
