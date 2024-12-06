import Sidebar from '../SideBar/SideBar';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const user = useSelector((store) => store.session.user); 
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    if (!user) {
      navigate('/login'); 
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

        
        <button
          className="start-tracking-button"
          onClick={() => {
            handleRedirect();
            if (user) {
              navigate('/glucose'); 
            }
          }}
        >
          Start Tracking
        </button>

        <p className="ask-question-message">
          Have any questions related to nutrition, diabetes, or health in general? Feel free to ask by clicking the button below!
        </p>

        
        <button
          className="ask-question-button"
          onClick={() => {
            handleRedirect();
            if (user) {
              navigate('/questions/ask'); 
            }
          }}
        >
          Ask a Question
        </button>

       
        <div className="goodrx-section">
          <h2>Save on Prescriptions with GoodRx</h2>
          <p>
            GoodRx helps you find the best prices for your prescriptions at pharmacies near you. 
            Whether you need insulin, diabetes medication, or other prescriptions, GoodRx makes it easy to compare prices 
            and save money. Insurance is not required. Visit the website to see how much you can save today!
          </p>

         
          <a 
            href="https://www.goodrx.com" 
            target="_blank" 
            rel="noopener noreferrer" 
          >
            <button className="goodrx-button">
              Visit GoodRx
            </button>
          </a>
        </div>

        {/* CalFresh Section */}
        <div className="calfresh-section">
          <h2>CalFresh: Nutritional Assistance for Low-Income Families</h2>
          <p>
            CalFresh, known federally as the Supplemental Nutrition Assistance Program (SNAP), provides monthly assistance for low or no income individuals and families to purchase nutritious food. 
            The CalFresh program issues monthly benefits on an Electronic Benefit Transfer (EBT) card, similar to an ATM card, to purchase food at retail stores and farmers markets that accept EBT cards.
          </p>

          <a 
            href="https://www.alamedacountysocialservices.org/our-services/Health-and-Food/CalFresh/index" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="calfresh-button">
              Learn More About CalFresh
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
