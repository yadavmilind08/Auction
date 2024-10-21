import Card from "../../components/Card";
import landingImage from "../../assets/images/landing.svg";
import { useEffect, useState } from "react";
import { get } from "../../services/api";
import { IAuctionItem } from "../../types/AuctionItem";
import Loader from "../../components/Loader/Index";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

const Landing = () => {
  const [items, setItems] = useState<IAuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const response = await get("/auctionItems");
        setItems(response as IAuctionItem[]);
      } catch (error) {
        console.error("Error fetching auction items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionItems();
  }, []);

  const handleBidNowClick = () => {
    setShowModal(true);
  };

  const confirmModal = () => {
    setShowModal(false);
    navigate("/auth/login");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <div className="flex justify-center mb-10">
        <img
          src={landingImage}
          alt="Landing"
          className="object-cover object-center"
        />
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-10 -mt-20">
        Explore <span className="text-blue-600">Auctions</span>
      </h1>

      {loading ? (
        <Loader />
      ) : items?.length === 0 ? (
        <div className="flex justify-center items-center text-gray-500">
          <p>
            No auction items available at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              minimumBid={item.minimumBid}
              currentBid={item.currentBid}
              endDate={item.endDate}
              onClick={handleBidNowClick}
            />
          ))}
        </div>
      )}

      <Modal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmModal}
        message="You need to login first. Do you want to continue?"
      />
    </div>
  );
};

export default Landing;
