import { useState } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { loginUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // הוספת מצב לניהול טעינה
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }
  
    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard"); // מעבר לדשבורד
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
};

export default LoginPage;
