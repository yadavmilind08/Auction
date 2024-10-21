import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAuctionItem } from "../../types/AuctionItem";
import { calculateTimeDifference } from "../../utility/auction";
import ButtonLoader from "../../components/Loader/ButtonLoader";

type BidModalProps = {
  show: boolean;
  loading: boolean;
  auctionItem: IAuctionItem;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitBid: (data: any) => void;
};

const schema = yup.object().shape({
  currentBid: yup.number(),
  straightBid: yup
    .number()
    .min(
      yup.ref("currentBid"),
      "Straight bid must be higher than the current bid"
    )
    .required("Straight bid is required"),
  maxBid: yup
    .number()
    .min(
      yup.ref("straightBid"),
      "Maximum bid must be greater than or equal to the straight bid"
    )
    .required("Maximum bid is required"),
});

const SubmitBidModal = ({
  show,
  loading,
  onClose,
  auctionItem,
  onSubmitBid,
}: BidModalProps) => {
  const { currentBid, minimumBid } = auctionItem;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentBid,
      straightBid: currentBid + 1,
      maxBid: currentBid + 1,
    },
  });

  useEffect(() => {
    setValue("straightBid", currentBid + 1);
    setValue("maxBid", currentBid + 1);
  }, [currentBid, setValue]);

  if (!show) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    onSubmitBid(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            Submit Bid{" "}
            <span className="text-sm font-normal text-gray-500">
              | {auctionItem?.title}
            </span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="straightBid" className="block text-sm mb-1">
              Straight Bid
            </label>
            <input
              type="number"
              {...register("straightBid")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.straightBid && (
              <p className="text-red-600 text-sm">
                {errors.straightBid.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="maxBid" className="block text-sm mb-1">
              Maximum Bid
            </label>
            <input
              type="number"
              {...register("maxBid")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.maxBid && (
              <p className="text-red-600 text-sm">
                {errors.maxBid.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Minimum Bid</p>
              <p className="text-lg font-bold">${minimumBid}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Current Bid</p>
              <p className="text-lg font-bold">${currentBid}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Ends in</p>
              <p className="text-lg font-bold">
                {calculateTimeDifference(auctionItem?.endDate)}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {loading && (
                <span className="mr-2">
                  <ButtonLoader />
                </span>
              )}{" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitBidModal;
