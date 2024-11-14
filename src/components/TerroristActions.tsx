import { useState } from "react";

interface TerroristActionsProps {
  socket: any;
}

export const TerroristActions: React.FC<TerroristActionsProps> = ({ socket }) => {
  const [target, setTarget] = useState("");
  const [missile, setMissile] = useState("");

  const handleLaunch = () => {
    if (target && missile) {
      socket.emit("launch", { target, missile });
      alert(`Missile ${missile} launched at ${target}!`);
    }
  };

  return (
    <div>
      <h2>Attack Actions</h2>
      <input
        type="text"
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <input
        type="text"
        placeholder="Missile Type"
        value={missile}
        onChange={(e) => setMissile(e.target.value)}
      />
      <button onClick={handleLaunch}>Launch Missile</button>
    </div>
  );
};
