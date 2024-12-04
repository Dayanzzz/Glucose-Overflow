import Sidebar from '../SideBar/SideBar';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const user = useSelector((store) => store.session.user); // Access user from the redux store
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation if the user is not logged in
  const handleRedirect = () => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not logged in
    }
  };

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="welcome-content">
        <h1>Welcome to Your Glucose Tracker</h1>
        <p className="intro-message">
          Track your daily blood sugar levels easily! Keep a log of your glucose readings before meals, after meals, and more.
          Monitor your health over time and make informed decisions to improve your well-being.
        </p>

        {/* Button to start tracking */}
        <button
          className="start-tracking-button"
          onClick={() => {
            handleRedirect();
            if (user) {
              navigate('/glucose'); // Redirect to glucose page if user is logged in
            }
          }}
        >
          Start Tracking
        </button>

        <p className="ask-question-message">
          Have any questions related to nutrition, diabetes, or health in general? Feel free to ask by clicking the button below!
        </p>

        {/* Button to ask a question */}
        <button
          className="ask-question-button"
          onClick={() => {
            handleRedirect();
            if (user) {
              navigate('/questions/ask'); // Redirect to ask questions page if user is logged in
            }
          }}
        >
          Ask a Question
        </button>

        {/* GoodRx Section */}
        <div className="goodrx-section">
          <h2>Save on Prescriptions with GoodRx</h2>
          <p>
            GoodRx helps you find the best prices for your prescriptions at pharmacies near you. 
            Whether you need insulin, diabetes medication, or other prescriptions, GoodRx makes it easy to compare prices 
            and save money. Insurance is not required. Visit the website to see how much you can save today!
          </p>
          <a href="https://www.goodrx.com" target="_blank" rel="noopener noreferrer">
            <button className="goodrx-button">Visit GoodRx</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

