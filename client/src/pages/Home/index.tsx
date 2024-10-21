import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { IAuctionItem } from "../../types/AuctionItem";
import { get } from "../../services/api";
import Loader from "../../components/Loader/Index";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<IAuctionItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto py-10 min-h-screen">
      {loading ? (
        <Loader />
      ) : items?.length === 0 ? (
        <div className="flex justify-center items-center text-gray-500">
          <p>
            No auction items available at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              minimumBid={item.minimumBid}
              currentBid={item.currentBid}
              endDate={item.endDate}
              onClick={() => navigate(`/bid/detail/${index}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
