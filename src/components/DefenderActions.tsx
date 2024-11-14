import { useState } from "react";

interface DefenderActionsProps {
  socket: any;
}

export const DefenderActions: React.FC<DefenderActionsProps> = ({ socket }) => {
  const [interceptor, setInterceptor] = useState("");

  const handleIntercept = () => {
    if (interceptor) {
      socket.emit("intercept", { interceptor });
      alert(`Interceptor ${interceptor} launched!`);
    }
  };

  return (
    <div>
      <h2>Defense Actions</h2>
      <input
        type="text"
        placeholder="Interceptor Type"
        value={interceptor}
        onChange={(e) => setInterceptor(e.target.value)}
      />
      <button onClick={handleIntercept}>Launch Interceptor</button>
    </div>
  );
};
