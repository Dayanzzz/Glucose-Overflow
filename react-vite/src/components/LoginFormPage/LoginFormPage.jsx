import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/"); // Navigate to homepage on successful login
    }
  };

  // Handle demo user login
  const handleDemoLogin = async () => {
    const demoUser = {
      email: "demo@aa.io",
      password: "password", // Example password for demo user
    };
    const serverResponse = await dispatch(thunkLogin(demoUser));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/"); // Navigate to homepage on successful demo login
    }
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      
      {/* Display errors if any */}
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
        
      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}

        <button type="submit">Log In</button>
      </form>

      {/* Sign Up Button */}
      <div className="signup-redirect">
        <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
      </div>

      {/* Demo User Button */}
      <div className="demo-login">
        <button onClick={handleDemoLogin}>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
