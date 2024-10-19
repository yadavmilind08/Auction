import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="mt-[80px]">
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
