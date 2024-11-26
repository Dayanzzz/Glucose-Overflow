import Sidebar from '../SideBar/SideBar'
import './HomePage.css'
import {Link} from 'react-router-dom'

function HomePage(){


    
    return(
        <>
        <div className="page-wrapper">
            <Sidebar/>
            <div className="welcome-content">
        <h1>Welcome to Your Glucose Tracker</h1>
        <p className="intro-message">
          Track your daily blood sugar levels easily! Keep a log of your glucose readings before meals, after meals, and more.
          Monitor your health over time and make informed decisions to improve your well-being.
        </p>
        <Link to="/glucose">
          <button className="start-tracking-button">Start Tracking</button>
        </Link>



        <p className="ask-question-message">
          Have any questions related to nutrition, diabetes, or health in general? Feel free to ask by clicking the button below!
        </p>
        <Link to="/questions/ask">
          <button className="ask-question-button">Ask a Question</button>
        </Link>


      </div>
            
        </div>
        </>
    ) 
       
}



export default HomePage