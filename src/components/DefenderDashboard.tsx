import { FC, useState } from "react";

const DefenderDashboard: FC = () => {
  const [interceptorName, setInterceptorName] = useState("");

  const handleIntercept = () => {
    console.log(`Intercepting with ${interceptorName}`);
  };

  return (
    <div>
      <h2>Defender Panel</h2>
      <label>
        Select Interceptor:
        <select value={interceptorName} onChange={(e) => setInterceptorName(e.target.value)}>
          <option value="">Select...</option>
          <option value="Iron Dome">Iron Dome</option>
          <option value="David's Sling">David's Sling</option>
          <option value="Patriot">Patriot</option>
        </select>
      </label>
      <br />
      <button onClick={handleIntercept} disabled={!interceptorName}>
        Intercept Missile
      </button>
    </div>
  );
};

export default DefenderDashboard;
