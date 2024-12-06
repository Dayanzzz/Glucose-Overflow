import Sidebar from '../SideBar/SideBar';
import './HomePage.css';
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
        Log your glucose, ask questions, and share insights with others to manage diabetes and improve your health together!
        </p>

        <div className="glucose-tracker-section">
          <h2>Start Tracking Your Glucose Levels</h2>
          <p>Track your blood sugar readings before and after meals, and monitor your health over time.</p>
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
        </div>

        <div className="ask-question-section">
          <h2>Have Questions About Nutrition?</h2>
          <p>Ask your questions here and get expert advice!</p>
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
        </div>

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
