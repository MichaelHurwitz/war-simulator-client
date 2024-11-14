import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface StoreMissile {
  id: string;
  name: string;
  price: number;
}

const StorePage = () => {
  const [storeMissiles, setStoreMissiles] = useState<StoreMissile[]>([]); // הגדרת סוגים
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    axios.get<StoreMissile[]>('http://localhost:3000/api/missiles').then((response) => {
      setStoreMissiles(response.data);
    });
  }, [user, navigate]);

  const handlePurchase = (missileId: string) => {
    axios.post(
      'http://localhost:3000/api/missiles/buy',
      { missileId },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
      .then(() => alert('Missile purchased!'))
      .catch((err) => alert('Failed to purchase missile: ' + err.message));
  };

  return (
    <div>
      <h1>Missile Store</h1>
      <ul>
        {storeMissiles.map((missile) => (
          <li key={missile.id}>
            {missile.name} - ${missile.price}
            <button onClick={() => handlePurchase(missile.id)}>Buy</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default StorePage;
