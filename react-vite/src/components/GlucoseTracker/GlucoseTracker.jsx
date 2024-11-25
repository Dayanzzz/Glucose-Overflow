import { Link } from 'react-router-dom';
import Sidebar from "../SideBar/SideBar";
import './GlucoseTracker.css';

function GlucoseTracker() {
  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="right-page">
        <div className="right-page-head">
          <h1 className="right-title">Blood Sugar Entries</h1>
          <Link to="/glucose/new">
            <button className="new-entry">Add Daily Sugar Log</button>
          </Link>
        </div>
        <div className="entres-grid">
          {/* Entries grid content */}
        </div>
      </div>
    </div>
  );
}

export default GlucoseTracker;
