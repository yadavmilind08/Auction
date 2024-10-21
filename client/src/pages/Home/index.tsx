import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { IAuctionItem } from "../../types/AuctionItem";
import { get } from "../../services/api";
import Loader from "../../components/Loader/Index";
import CreateAuctionModal from "./CreateAuctionModal";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<IAuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchAuctionItems();
  }, []);

  const handleItemCreated = () => {
    fetchAuctionItems(); // Refresh the item list after creating a new auction item
  };

  return (
    <div className="container mx-auto py-10 min-h-screen">
      {loading ? (
        <Loader />
      ) : items.length === 0 ? (
        <div className="flex justify-center items-center text-gray-500">
          <p>
            No auction items available at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 bg-blue-500 text-white p-2 mx-6 rounded flex align-right"
          >
            Create Auction Item
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
            {items.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                minimumBid={item.minimumBid}
                currentBid={item.currentBid}
                endDate={item.endDate}
                onClick={() => navigate(`/bid/detail/${item.id}`)}
              />
            ))}
          </div>
        </>
      )}

      <CreateAuctionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemCreated={handleItemCreated}
      />
    </div>
  );
};

export default Home;
