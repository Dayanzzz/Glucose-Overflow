import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SideBar.css'




function Sidebar(){
    const user = useSelector((store) => store.session.user);
    const navigate = useNavigate();

    if (!user) navigate(`/login`);

    return(
        <div className="sidebar">
            <div className="user-name">
                <h2>{ !user? "Welcome" : `Hi, ${user.username}`}</h2>
            </div>
            <div className="sidebar-btn-area">
                <NavLink to="/" title="Go to Homepage Dashboard">Homepage</NavLink>
            </div>
            <div className="sidebar-btn-area">
            <NavLink to="/glucose" title="See Your Glucose-overflow">Blood Sugar Tracker</NavLink>
           
            
            </div>
            <div className="sidebar-btn-area">
            <NavLink to="/questions" title="Click here to view Questions">Questions</NavLink>
           
            
            </div>
            <div className="sidebar-btn-area">
            <NavLink to="/questions/manage" title="Click here to view Questions">My Questions</NavLink>
           
            
            </div>
            {/* <div className="sidebar-btn-area">
            <NavLink to="/recipes" title="Click here to view Recipes">Recipes</NavLink>
        
            </div>
            
            <div className="sidebar-btn-area">
            <NavLink to="/bookmarks" title="See Your Favorites">Bookmarks</NavLink>
          
            </div> */}
      </div>
    )
}

export default Sidebar;