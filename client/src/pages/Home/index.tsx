import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

const items = [
  {
    image: "../../src/assets/images/logo.svg",
    title: "Sony Black Headphones",
    minimumBid: 100,
    currentBid: 157,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Apple AirPod 2nd Gen",
    minimumBid: 80,
    currentBid: 95,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Mi 3i 20000mAh Power Bank",
    minimumBid: 40,
    currentBid: 46,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Tribit Bluetooth Speaker",
    minimumBid: 10,
    currentBid: 15,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "WiFi Security Camera",
    minimumBid: 100,
    currentBid: 157,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Sony Black Headphones 1",
    minimumBid: 100,
    currentBid: 157,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Apple AirPod 2nd Gen 1",
    minimumBid: 80,
    currentBid: 95,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Mi 3i 20000mAh Power Bank 1",
    minimumBid: 40,
    currentBid: 46,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Tribit Bluetooth Speaker 1",
    minimumBid: 10,
    currentBid: 15,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "WiFi Security Camera 1",
    minimumBid: 100,
    currentBid: 157,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Sony Black Headphones 2",
    minimumBid: 100,
    currentBid: 157,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Apple AirPod 2nd Gen 2",
    minimumBid: 80,
    currentBid: 95,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
  {
    image: "../../src/assets/images/logo.svg",
    title: "Mi 3i 20000mAh Power Bank 2",
    minimumBid: 40,
    currentBid: 46,
    timeLeft: "1 day 12 hrs 43 minutes",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
        {items.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            minimumBid={item.minimumBid}
            currentBid={item.currentBid}
            timeLeft={item.timeLeft}
            onClick={() => navigate(`/bid/detail/${index}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
