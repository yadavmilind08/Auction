const BidDetail = () => {
  return (
    <div className="container mx-auto py-10 h-screen">
      <div className="flex flex-col md:flex-row p-6 md:p-12 ">
        <div className="md:w-1/4 flex flex-col">
          <img
            src="path-to-image.jpg" // Replace with the actual image path
            alt="Sony Black Headphones"
            className="w-full h-auto rounded-lg"
          />
          <div className="mt-4 text-sm font-semibold text-green-600">
            Live Auction
          </div>
          <h2 className="mt-2 text-xl font-bold">Sony Black Headphones</h2>
          <p className="text-gray-600">Minimum Bid</p>
          <p className="text-2xl font-bold">$100</p>
          <p className="text-gray-600">Current Bid</p>
          <p className="text-2xl font-bold">$157</p>
          <p className="mt-4 text-gray-500">Ends in: 1 day 12 hrs 43 minutes</p>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 md:px-6">
          <div className="mb-8">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="mt-2 text-gray-700">
              Immerse yourself in pristine sound quality with the Sony Black
              Headphones. Crafted for audiophiles and casual listeners alike,
              these headphones deliver an exceptional audio experience with
              deep, resonant bass and crystal-clear highs. The sleek black
              design complements any style, whether you're on the go or relaxing
              at home.
            </p>
          </div>

          <div className="mb-8">
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
          </div>
        </div>

        <div className="md:w-1/4 mt-8 md:mt-0">
          <div className="mb-8">
            <h3 className="text-lg font-bold">Bid History</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-700">The Floor bids $157</li>
              <li className="text-gray-700">The Floor bids $150</li>
            </ul>
          </div>

          <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Bid now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidDetail;
