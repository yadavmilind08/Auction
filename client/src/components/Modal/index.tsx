import { FaTimes } from "react-icons/fa";

type ModalProps = {
  show: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

const Modal = ({ show, onClose, message, onConfirm }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 p-5 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">Attention</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
