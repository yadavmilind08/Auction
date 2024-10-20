import { Link } from "react-router-dom";
import signedupSceneImage from "../../assets/images/signedup-scene.svg";

const Signedup = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-6">
      <header className="text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Uncover Deals, Unleash Excitement:{" "}
          <span className="text-blue-600">Dive into Our Auctions Today!</span>
        </h1>
      </header>

      <div className="mt-6 flex items-center justify-center">
        <img
          src={signedupSceneImage}
          alt="Signedup Image"
          className="h-auto max-h-[40vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] object-contain"
        />
      </div>

      <div className="mt-10">
        <Link to="/auth/login">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium text-sm">
            Login now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signedup;
