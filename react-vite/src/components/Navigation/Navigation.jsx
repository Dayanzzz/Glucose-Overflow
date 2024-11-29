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

  // Demo user login credentials
  const demoUser = {
    email: "demo@aa.io",
    password: "password"
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    
    // Dispatching the demo login action
    const serverResponse = await dispatch(thunkLogin(demoUser));

    // If there are any errors during login, you can handle them here
    if (serverResponse) {
      console.error("Error logging in as demo user:", serverResponse);
    }
  };

  return (
    <div className="wrapper">
      <div className="nav-link-area">
        <div className="headerlink">
          <a href="https://www.goodrx.com/" title="Click here to access coupons">
            GoodRx
          </a>
        </div>

        {/* Show either the ProfileButton or login options based on whether user is logged in */}
        {!user ? (
          <div>
            {/* Regular Login Button */}
            <button onClick={() => openModal(<LoginFormModal />)}>Log In</button>

            {/* Demo User Login Button */}
            <button onClick={handleDemoLogin}> Demo User</button>
          </div>
        ) : (
          <ProfileButton />
        )}
      </div>
    </div>
  );
}

export default Navigation;
