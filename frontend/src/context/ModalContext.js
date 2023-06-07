import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false)
  const [tripToUpdate, setTripToUpdate] = useState(null)

  return (
    <ModalContext.Provider
      value={{
        toggleModal,
        toggleForm,
        setToggleModal,
        setToggleForm,
        toggleEditModal,
        setToggleEditModal,
        tripToUpdate,
        setTripToUpdate
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
