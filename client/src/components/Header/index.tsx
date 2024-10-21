import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import logoImage from "../../assets/images/logo.svg";
import profileImage from "../../assets/images/profile.svg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useUserStore from "../../store/useUserStore";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSignout = () => {
    logout();
    clearUser();
    navigate("/auth/login");
  };

  return (
    <header className="bg-pink-100 flex justify-between p-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-lg font-semibold text-gray-900">
            Genix Auctions
          </span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center space-x-6 relative">
            {/* Navigation Links */}
            <nav className="hidden  md:flex">
              <Link
                to="/dashboard"
                className="text-gray-500 hover:text-gray-900 font-medium mr-1 flex items-center"
              >
                <span className="mr-1">Auctions</span>
                <FaChevronDown />
              </Link>
            </nav>

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              <img
                src={profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={toggleProfileMenu}
              />

              {isProfileOpen && (
                <div
                  ref={profileRef}
                  className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg z-20"
                >
                  <div className="p-4 flex items-center">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold">{user?.username}</h4>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  {/* <ul className="p-4">
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      View profile
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      My bids
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Credit cards
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      My Auctions
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Invite colleagues
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Notifications
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Community
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Support
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      API
                    </li>
                  </ul>
                  <hr /> */}
                  <div
                    className="p-4 text-red-500 cursor-pointer hover:bg-gray-100"
                    onClick={onSignout}
                  >
                    Log out
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="text-md font-semibold text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
