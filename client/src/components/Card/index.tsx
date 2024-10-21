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
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-500">Minimum Bid</p>
      <p className="text-xl font-bold">${minimumBid}</p>
      <p className="text-gray-500">Current Bid</p>
      <p className="text-xl font-bold">${currentBid}</p>
      <p className="text-gray-500">Ends in: {endDate}</p>
      <button
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
        onClick={onClick}
      >
        Bid now
      </button>
    </div>
  );
};

export default Card;
