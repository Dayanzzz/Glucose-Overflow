import Sidebar from '../SideBar/SideBar'
import './HomePage.css'

function HomePage(){


    
    return(
        <>
        <div className="page-wrapper">
            <Sidebar/>
            <div className="content-wrapper"><h1 className="welcome">Welcome!</h1></div>
            
        </div>
        </>
    ) 
       
}



export default HomePage