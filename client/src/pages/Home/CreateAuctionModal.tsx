import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { post } from "../../services/api";
import useUserStore from "../../store/useUserStore";

interface IFormInputs extends Record<string, unknown> {
  title: string;
  description: string;
  minimumBid: number;
  currentBid: number;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  minimumBid: yup
    .number()
    .required("Minimum bid is required")
    .positive("Minimum bid must be greater than 0"),
  currentBid: yup
    .number()
    .required("Current bid is required")
    .positive("Current bid must be greater than 0"),
});

interface CreateAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: () => void;
}

const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({
  isOpen,
  onClose,
  onItemCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      minimumBid: 0,
      currentBid: 0,
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    setLoading(true); // Start loading state
    try {
      const parsedData = {
        ...data,
        minimumBid: parseInt(data.minimumBid.toString()),
        currentBid: parseInt(data.currentBid.toString()),
        userId: user?.id,
      };

      await post("/auctionItems", parsedData);
      onItemCreated();
      onClose();
    } catch (error) {
      console.error("Error creating auction item:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Create Auction Item</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="minimumBid" className="block text-sm mb-1">
              Minimum Bid
            </label>
            <input
              type="number"
              {...register("minimumBid")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.minimumBid && (
              <p className="text-red-600 text-sm">
                {errors.minimumBid.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="currentBid" className="block text-sm mb-1">
              Current Bid
            </label>
            <input
              type="number"
              {...register("currentBid")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.currentBid && (
              <p className="text-red-600 text-sm">
                {errors.currentBid.message}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="bg-gray-300 p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={loading} // Disable button when loading
            >
              {loading && <span className="spinner-border mr-2" />} Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuctionModal;
