import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [tripToUpdate, setTripToUpdate] = useState(null);
  const [toggleReviewModal, setToggleReviewModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        toggleModal,
        setToggleModal,
        toggleForm,
        setToggleForm,
        toggleEditModal,
        setToggleEditModal,
        tripToUpdate,
        setTripToUpdate,
        toggleReviewModal,
        setToggleReviewModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
