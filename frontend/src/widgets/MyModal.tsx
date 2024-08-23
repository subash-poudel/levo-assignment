import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#D3D3D3",
  },
  overlay: { zIndex: 1000 },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
interface MyModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const MyModal: React.FC<MyModalProps> = ({ isOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnEsc={true}
      >
        <div className="bg-yellow-100">
          <h2>Hello</h2>
          <button onClick={closeModal}>close</button>
          <p className="bg-red-400">I am a modal</p>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
