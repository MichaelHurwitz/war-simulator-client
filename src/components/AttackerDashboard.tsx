import { FC, useState } from "react";

const AttackerDashboard: FC = () => {
  const [target, setTarget] = useState("");
  const [missileName, setMissileName] = useState("");

  const handleLaunch = () => {
    console.log(`Launching ${missileName} to ${target}`);
  };

  return (
    <div>
      <h2>Attacker Panel</h2>
      <label>
        Select Target:
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="">Select...</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>
      </label>
      <br />
      <label>
        Select Missile:
        <select value={missileName} onChange={(e) => setMissileName(e.target.value)}>
          <option value="">Select...</option>
          <option value="Qassam">Qassam</option>
          <option value="M-75">M-75</option>
          <option value="Fajr-5">Fajr-5</option>
        </select>
      </label>
      <br />
      <button onClick={handleLaunch} disabled={!target || !missileName}>
        Launch Missile
      </button>
    </div>
  );
};

export default AttackerDashboard;
