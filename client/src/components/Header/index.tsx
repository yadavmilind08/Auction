import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.svg";
import profileImage from "../../assets/images/profile.svg";

const Header = () => {
  return (
    <header className="bg-pink-200 flex justify-between p-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-lg font-semibold text-gray-900">
            Genix Auctions
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <img
            src={profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
