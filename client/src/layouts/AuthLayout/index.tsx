import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-200 py-4 px-6 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-lg font-semibold text-gray-900">
              Genix Auctions
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto mt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
