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

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store)=> store.session.user);

  return (
    <div className="wrapper">
    
      <div className="nav-link-area">
      <div className="headerlink">
      <a href="https://www.goodrx.com/" title="Click here to access coupons">GoodRx</a>
      </div>
        <div><ProfileButton /></div>
      </div>

    </div>
  );
}

export default Navigation;
