// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation() {
//   return (
// //     <ul>
// //       <li>
// //         <NavLink to="/">Home</NavLink>
// //       </li>

// //       <li>
// //         <ProfileButton />
// //       </li>
// //     </ul>
// //   );
// // }

// // export default Navigation;

// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation() {
//   const user = useSelector((store)=> store.session.user);
//   const dispatch = useDispatch();

//   return (
//     <div className="wrapper">
    
//       <div className="nav-link-area">
//       <div className="headerlink">
//       <a href="https://www.goodrx.com/" title="Click here to access coupons">GoodRx</a>
//       </div>
//         <div><ProfileButton /></div>
//       </div>

//     </div>
//   );
// }

// export default Navigation;

// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation() {
//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>

//       <li>
//         <ProfileButton />
//       </li>
//     </ul>
//   );
// }

// export default Navigation;
import { useSelector, useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import ProfileButton from "./ProfileButton";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);


  const demoUser = {
    email: "demo@aa.io",
    password: "password"
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    

    const serverResponse = await dispatch(thunkLogin(demoUser));

 
    if (serverResponse) {
      console.error("Error logging in as demo user:", serverResponse);
    }
  };

  return (
    <div className="wrapper">
      <div className="nav-link-area">
        <div className="headerlink">
         
          <a 
            href="https://www.goodrx.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Click here to access coupons"
          >
            GoodRx
          </a>
          <a 
            href="https://diabetes.org//" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Click here to access coupons"
          >
             Diabetes Association
          </a>

          
        </div>

      
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
