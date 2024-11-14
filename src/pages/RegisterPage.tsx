import { useState } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { registerUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    organization: '',
    region: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    await dispatch(registerUser(formData));
    navigate('/');
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="text"
        placeholder="Organization"
        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
      />
      <input
        type="text"
        placeholder="Region"
        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
