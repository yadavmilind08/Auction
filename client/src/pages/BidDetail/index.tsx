import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { get, post } from "../../services/api";
import { IAuctionItem } from "../../types/AuctionItem";
import Loader from "../../components/Loader/Index";
import SubmitBidModal from "./SubmitBidModal";
import useUserStore from "../../store/useUserStore";
import { IBidItem } from "../../types/BidItem";
import { calculateTimeDifference } from "../../utility/auction";
import { AUCTION_ENDED } from "../../constants";

const BidDetail = () => {
  const { id } = useParams();
  const [auctionItem, setAuctionItem] = useState<IAuctionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctionItem = async () => {
      try {
        const response = await get(`/auctionItems/${id}`);
        setAuctionItem(response as IAuctionItem);
      } catch (error) {
        console.error("Error fetching auction item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionItem();
  }, [id, auctionItem?.currentBid]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBidSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await post(`/auctionItems/${id}/bids`, {
        amount: data.straightBid,
        isStraightBid: !!data.straightBid,
        auctionItemId: id,
        userId: user?.id,
      });
      console.log("Bid placed successfully:", response);

      setAuctionItem((prev) => {
        if (prev) {
          return {
            ...prev,
            currentBid: data.straightBid,
          };
        }
        return null;
      });
    } catch (error) {
      console.error("Error placing bid:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row p-6 md:p-12 ">
          <div className="md:w-1/4 flex flex-col">
            <div className="mb-4">
              <button
                className="flex items-center text-blue-600 hover:underline"
                onClick={() => navigate(-1)} // Navigate back
              >
                <AiOutlineArrowLeft className="mr-2 h-5 w-5" />
                Back to catalog
              </button>
            </div>
            <img
              src="/" //TODO
              alt={auctionItem?.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4 text-sm font-semibold">
              {auctionItem?.endDate &&
              calculateTimeDifference(auctionItem?.endDate) ===
                AUCTION_ENDED ? (
                <span className="text-red-600">Auction Ended</span>
              ) : (
                <span className="text-green-600">Live Auction</span>
              )}
            </div>
            <h2 className="my-2 text-xl font-bold">{auctionItem?.title}</h2>
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Minimum Bid</p>
                <p className="text-lg font-bold mr-4">
                  ${auctionItem?.minimumBid}
                </p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Current Bid</p>
                <p className="text-lg font-bold mr-4">
                  ${auctionItem?.currentBid}
                </p>
              </div>
            </div>
            {auctionItem?.endDate && (
              <p className="mt-4 text-gray-500">
                Ends in: {calculateTimeDifference(auctionItem?.endDate)}
              </p>
            )}
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 md:px-6">
            <div className="mb-8">
              <h3 className="text-lg font-bold">Description</h3>
              <p className="mt-2 text-gray-700">{auctionItem?.description}</p>
            </div>

            {/* TODO */}
            {/* <div className="mb-8">
            <h3 className="text-lg font-bold">Reviews</h3>
            <div className="mt-4">
              <div className="text-yellow-500 mb-1">★★★★★</div>
              <p className="text-sm mb-1">
                These headphones are a game-changer for my daily commute. The
                noise-canceling feature works like a charm.
              </p>
              <p className="text-md text-gray-500 mt-1">Kristin Watson</p>
              <p className="text-sm text-gray-300 mt-1 mb-1">March 14, 2021</p>
            </div>
            <div className="mt-4">
              <div className="text-yellow-500 mb-1">★★★★★</div>
              <p className="text-sm mb-1">
                These headphones are a game-changer for my daily commute. The
                noise-canceling feature works like a charm.
              </p>
              <p className="text-md text-gray-500 mt-1">Kristin Watson</p>
              <p className="text-sm text-gray-300 mt-1 mb-1">March 14, 2021</p>
            </div>
          </div> */}
          </div>

          <div className="md:w-1/4 mt-8 md:mt-0">
            <div className="mb-8">
              <h3 className="text-lg font-bold">Bid History</h3>
              <ul className="mt-4 space-y-2">
                {auctionItem?.bids
                  ?.sort((a, b) => b.amount - a.amount)
                  ?.map((bid: IBidItem) => (
                    <li key={bid.id} className="text-gray-700">
                      User {bid.userId} bids ${bid.amount}
                    </li>
                  ))}
                <li className="text-gray-700">
                  The Floor bids ${auctionItem?.minimumBid}
                </li>
              </ul>
            </div>

            <button
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Bid now &rarr;
            </button>
          </div>

          {auctionItem && showModal && (
            <SubmitBidModal
              show={showModal}
              loading={loading}
              onClose={() => setShowModal(false)}
              auctionItem={auctionItem}
              onSubmitBid={handleBidSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BidDetail;
