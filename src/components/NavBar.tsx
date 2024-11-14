import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slices/userSlice";
import { FC } from "react";

const NavBar: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/store">Store</Link>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
