import logoImage from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="sticky bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="Genix Auctions" className="w-8 h-8" />
          <span className="font-bold text-xl">Genix Auctions</span>
        </div>
      </div>
      <div className="text-center mt-4">
        © Copyright 2024, All Rights Reserved by Genix
      </div>
    </footer>
  );
};

export default Footer;
