import Sidebar from '../SideBar/SideBar'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewGlucose.css'

function NewGlucose(){
    const [date, setDate] = useState('');
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [hba1c, setHba1c] = useState(''); // Optional HbA1c field
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
        entry_date: date,
        breakfast: parseInt(breakfast),
        lunch: parseInt(lunch),
        dinner: parseInt(dinner),
        hba1c: hba1c ? parseInt(hba1c) : null, // Optional HbA1c
      };
  
      try {
        const response = await fetch('/api/glucose', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          // On success, navigate back to the glucose tracker or other page
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="breakfast">Before Breakfast (mg/dL):</label>
                <input
                  type="number"
                  id="breakfast"
                  value={breakfast}
                  onChange={(e) => setBreakfast(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lunch">Before Lunch (mg/dL):</label>
                <input
                  type="number"
                  id="lunch"
                  value={lunch}
                  onChange={(e) => setLunch(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dinner">Before Dinner (mg/dL):</label>
                <input
                  type="number"
                  id="dinner"
                  value={dinner}
                  onChange={(e) => setDinner(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hba1c">HbA1c (optional):</label>
                <input
                  type="number"
                  id="hba1c"
                  value={hba1c}
                  onChange={(e) => setHba1c(e.target.value)}
                />
              </div>
              <button type="submit">Create Blood Sugar Entry</button>
            </form>
    
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      );
}

export default NewGlucose