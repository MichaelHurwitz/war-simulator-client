import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchMissiles } from "../store/slices/missileSlice";

const MissileInventory: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { missiles, loading, error } = useSelector((state: RootState) => state.missiles);

  useEffect(() => {
    dispatch(fetchMissiles());
  }, [dispatch]);

  if (loading) return <p>Loading missiles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Your Missile Inventory</h3>
      <ul>
        {missiles.map((missile) => (
          <li key={missile.name}>
            {missile.name}: {missile.amount}
          </li>
        ))}
      </ul>
      <button onClick={() => console.log("Go to store!")}>Buy More Missiles</button>
    </div>
  );
};

export default MissileInventory;
