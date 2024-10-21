import { AUCTION_ENDED } from "../../constants";
import { calculateTimeDifference } from "../../utility/auction";

type CardProp = {
  title: string;
  minimumBid: number;
  currentBid: number;
  endDate: string;
  onClick?: () => void;
};
const Card = ({
  title,
  minimumBid,
  currentBid,
  endDate,
  onClick,
}: CardProp) => {
  return (
    <div className="border rounded-lg shadow-md p-4 overflow-hidden">
      <img
        src={"/"} //TODO
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="my-4 text-sm font-semibold">
        {calculateTimeDifference(endDate) === AUCTION_ENDED ? (
          <span className="text-red-600">Auction Ended</span>
        ) : (
          <span className="text-green-600">Live Auction</span>
        )}
      </div>

      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Minimum Bid</p>
          <p className="text-lg font-bold">${minimumBid}</p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Current Bid</p>
          <p className="text-lg font-bold">${currentBid}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        Ends in: {calculateTimeDifference(endDate)}
      </p>
      <button
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
        onClick={onClick}
        disabled={calculateTimeDifference(endDate) === AUCTION_ENDED}
      >
        Bid now
      </button>
    </div>
  );
};

export default Card;
