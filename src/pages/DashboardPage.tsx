import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { MissileList } from "../components/MissileList";
import { TerroristActions } from "../components/TerroristActions";
import { DefenderActions } from "../components/DefenderActions";
import { io } from "socket.io-client";

const DashboardPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const [socket, setSocket] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // חיבור ל-WebSocket
    const socketInstance = io('http://localhost:3000', {
      query: { region: user.region },
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user, navigate]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <MissileList missiles={user.missiles} />
      {user.organization.startsWith("IDF") ? (
        <DefenderActions socket={socket} />
      ) : (
        <TerroristActions socket={socket} />
      )}
      <button onClick={() => navigate('/store')}>Go to Store</button>
    </div>
  );
};

export default DashboardPage;
