interface MissileListProps {
    missiles: { name: string; amount: number }[];
  }
  
  export const MissileList: React.FC<MissileListProps> = ({ missiles }) => {
    return (
      <div>
        <h2>Missiles in Stock:</h2>
        <ul>
          {missiles.map((missile, index) => (
            <li key={index}>
              {missile.name}: {missile.amount}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  