import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { IAuctionItem } from "../../types/AuctionItem";
import { get, del } from "../../services/api";
import Loader from "../../components/Loader/Index";
import CreateAuctionModal from "./CreateAuctionModal";
import useUserStore from "../../store/useUserStore";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<IAuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IAuctionItem | null>(null); // State for editing item
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<IAuctionItem | null>(null);
  const user = useUserStore((state) => state.user);

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

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await del(`/auctionItems/${itemToDelete.id}`); // API call to delete the auction item
        fetchAuctionItems(); // Refresh the list after deletion
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting auction item:", error);
      }
    }
  };

  const openEditModal = (item: IAuctionItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
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
              <div key={index} className="relative">
                <Card
                  title={item.title}
                  minimumBid={item.minimumBid}
                  currentBid={item.currentBid}
                  endDate={item.endDate}
                  onClick={() => navigate(`/bid/detail/${item.id}`)}
                />
                {user && item.userId === user.id && (
                  <div className="flex justify-center mt-2 flex space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="bg-yellow-500 text-white p-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete(item);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <CreateAuctionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemCreated={handleItemCreated}
        editingItem={editingItem}
      />

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Delete Auction Item</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
