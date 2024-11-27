import Sidebar from '../SideBar/SideBar';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NewGlucose.css';
import { updateGlucoseEntry } from '../../redux/glucose';

function UpdateGlucose() {
  const [date, setDate] = useState('');  
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [hbA1c, setHbA1c] = useState(''); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();
  const { entryId } = useParams(); 
  const dispatch = useDispatch(); 

  useEffect(() => {
  
    const fetchGlucoseEntry = async () => {
      try {
        const response = await fetch(`/api/glucose/${entryId}`);
        const data = await response.json();

        if (response.ok) {
          
          setDate(formatDate(data.date));  
          setBreakfast(data.before_breakfast);
          setLunch(data.before_lunch);
          setDinner(data.before_dinner);
          setHbA1c(data.hbA1c || ''); 
          setLoading(false); 
        } else {
          setError(data.error || 'Failed to fetch the glucose entry');
          setLoading(false);
        }
      } catch (err) {
        setError('Error while fetching glucose entry');
        setLoading(false);
        console.error(err);
      }
    };

    fetchGlucoseEntry();
  }, [entryId]); 

 
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear(); 
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(date).toISOString().split('T')[0]; 

    const data = { 
      date: formattedDate,
      before_breakfast: breakfast || null,  
      before_lunch: lunch || null,  
      before_dinner: dinner || null,  
      hbA1c: hbA1c ? parseFloat(hbA1c) : null, 
    };

    console.log('Data being sent to the backend:', data);

    try {
      const response = await fetch(`/api/glucose/${entryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response from the backend:', responseData);

      if (response.ok) {
        
        dispatch(updateGlucoseEntry(responseData)); 
        setSuccess(true); 
        setTimeout(() => {
          navigate('/glucose');  
        }, 2000); 
      } else {
        setError(responseData.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error while updating blood sugar entry');
      console.error(err);
    }
  };

 
  if (loading) {
    return (
      <div className="Create-wrapper">
        <Sidebar />
        <div className="create-blood-sugar-container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="Create-wrapper">
      <Sidebar />
      <div className="create-blood-sugar-container">
        <h1>Edit Blood Sugar Entry</h1>
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="lunch">Before Lunch (mg/dL):</label>
            <input
              type="number"
              id="lunch"
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dinner">Before Dinner (mg/dL):</label>
            <input
              type="number"
              id="dinner"
              value={dinner}
              onChange={(e) => setDinner(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hbA1c">HbA1c (optional):</label>
            <input
              type="number"
              id="hbA1c"
              value={hbA1c}
              onChange={(e) => setHbA1c(e.target.value)}
            />
          </div>
          <button type="submit">Update Blood Sugar Entry</button>
        </form>

       
        {error && <p className="error">{error}</p>}

     
        {success && <p className="success">Update successful! Redirecting to glucose tracker...</p>}
      </div>
    </div>
  );
}

export default UpdateGlucose;
