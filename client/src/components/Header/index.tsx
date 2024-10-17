import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MyApp</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/auth/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
